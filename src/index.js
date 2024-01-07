
import utils from "./utils.js"
import kws from "./kws.js"
import adv from "./adv.js"
import {monkeyDummy} from "./monkey.js"
monkeyDummy();

export { utils, kws };
// export const k1js = { utils, kws, log: adv.log };
export default { utils, kws, log: adv.log };



