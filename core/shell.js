// Shell memory
export const memory = [];

// Shell event
class ShellEvent {

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

}

// Shell log
export function log(msg) {
    memory.push(new ShellEvent('log', msg));
    console.log(msg);
};

// Shell warn
export function warn(msg) {
    memory.push(new ShellEvent('warn', msg));
    console.error(msg);
};

// Shell error
export function error(msg) {
    memory.push(new ShellEvent('error', msg));
    console.error(msg);
};
