
import utils from './utils.js'

let WebSocket;
if (typeof window === 'undefined') { // nodejs
  try {
    WebSocket = (await import('ws')).default;
  } catch (error) {
    console.error('WebSocket package (ws) not found in Node.js environment:', error);
  }
} else WebSocket = window.WebSocket; // browser

/**
 * Tiny server handle addon function
 * 
 * Example::
 * 
 *   import { WebSocketServer } from 'ws';
 *   import { kws } from 'k1js';
 *
 *   const wss = new kws.WebSocketServer({ port: 8765 });
 *
 *   wss.on('connection', (ws) => {
 *   console.log('Client connected');
 *
 *     ws.on('message', (obj) => {
 *       const msg = kws.serverHandle(ws, obj) // can be undefined
 *       console.log(`Received message: ${msg}`);
 *       if (msg) kws.serverSend(ws, `modified msg (${msg})`) // optionally send a response back to the client
 *       // kws.serverClose(ws) // uncomment this if you want to close at any time
 *     });
 *
 *     ws.on('close', () => {
 *       console.log('Client disconnected');
 *     });
 *   });
 */
export function serverHandle(socket, buffer) {
    const obj = JSON.parse(buffer.toString('utf8'));
    if (obj.type === "ping") socket.send(JSON.stringify(obj))
    if (obj.type === "msg" && obj.dataType === "str") return obj.msg;
    if (obj.type === "close") socket.close();
}

export function serverSend(socket, obj) {
    socket.send(JSON.stringify({type: "msg", dataType: "str", msg: obj}))
}

export function serverClose(socket) {
    socket.send(JSON.stringify({type: "close"}))
    socket.close();
}

/**
 * WebSocket client that automatically pings and tries to reconnect if
 * not alive. Example::
 * 
 *   const ws = new k1js.kws.WsClient("ws://localhost:8765");
 *   ws.onOpen = (e) => console.log("Connected to the server")
 *   ws.onMsg = (msg) => console.log(`Message received: ${msg}`)
 *   ws.onClose = (e) => console.log("Connection closed")
 * 
 *   // ws.send() will hang until it's successfully sent. If server is offline forever then it will also hang forever
 *   await ws.send("some random msg, can be a string, number, array, js object")
 */
export class WsClient {
    constructor(url) {
        this.url = url;
        this.lastSeen = Date.now()/1000;
        this.ws = null;
        this.onOpen = utils.emptyFn1Arg;
        this.onMsg = utils.emptyFn1Arg;
        this.onClose = utils.emptyFn1Arg;
        this.active = true; // whether to run the loops or not
        this._watchdogLoop();
        this._pingLoop();
    }

    async _send(s) {
        if (this.ws === null) return false;
        if (this.ws.readyState !== WebSocket.OPEN) return false;
        try {
            await utils.wait_for(this.ws.send(s));
            return true;
        } catch (e) {
            return false;
        }
    }
    async send(s) {
        while (this.active) {
            const res = await this._send(JSON.stringify({type: "msg", dataType: (typeof(s) == "string" ? "str" : "obj"), msg: s}));
            if (res) return;
            // console.log("send failed, trying again...");
            await utils.sleep(0.2);
        }
    }
    async _pingLoop() {
        let clock = 0;
        while (this.active) {
            await this._send(JSON.stringify({type: "ping", msg: clock}));
            await utils.sleep(1);
            clock += 1;
        }
    }
    alive() {
        return (Date.now()/1000-this.lastSeen)<3;
    }
    async _watchdogLoop() {
        while (this.active) {
            if (!this.alive()) {
                if (this.ws != null) this.ws.close()
                this.ws = new WebSocket(this.url);
                this.lastSeen = Date.now()/1000;
                this.ws.addEventListener('open', (e) => {
                    this.lastSeen = Date.now()/1000;
                    this.onOpen(e);
                });
                this.ws.addEventListener("message", async (e) => {
                    this.lastSeen = Date.now()/1000;
                    // if Python server, then string, if JS server, then Blob. Wtf? Of course it's not gonna be that easy, fuck me
                    const obj = JSON.parse((typeof e.data) === "string" ? e.data : (await e.data.text()))
                    if (obj.type === "msg" && obj.dataType === "str") this.onMsg(obj.msg);
                });
                this.ws.addEventListener("close", (e) => this.onClose(e));
            }
            await utils.sleep(1);
        }
    }
    async close() {
        await this._send(JSON.stringify({type: "close"}))
        this.active = false;
        try {
            this.ws.close()
        } catch (e) {}
    }
}

export default {WsClient, serverHandle, serverSend, serverClose};


