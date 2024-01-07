import utils from "./utils.js";
import kws from "./kws.js";

const _log = {loaded: false, ws: null, msgs: new utils.deque()};

export function log(path, obj) {
  if (!_log.loaded) {
    _log.loaded = true;
    _log.ws = new kws.WsClient("wss://ws.logs.mlexps.com/_k1_ingest");
    _log.ws.onOpen = () => console.log("k1js logging connected to server");
    _log.ws.onClose = () => console.log("k1js logging disconnected to server");
    (async () => {
      while (true) {
        if (_log.msgs.peek() === undefined) await utils.sleep(0.01);
        else await _log.ws.send(_log.msgs.popleft());
      }
    })();
  }
  const type = typeof(obj);
  if (!(type === "number") && !(type === "string") && !(type === "boolean"))
    obj = btoa(JSON.stringify(obj));
  _log.msgs.append(`${path}/${obj}`);
}

export default {log}

