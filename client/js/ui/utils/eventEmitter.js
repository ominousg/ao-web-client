const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
module.exports = eventEmitter;
