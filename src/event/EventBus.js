class EventBus {
    constructor() {
        this.subs = {};
    }
    on(type, fn) {
        if(this.subs[type]) {
            this.subs[type].push(fn);
        }else {
            this.subs[type] = [fn];
        }
    }
    emit(type, params) {
        this.subs[type] && this.subs[type].forEach(fn => {
            fn(params)
        });
    }
    off(type, currentFn) {
        if(currentFn) {
            this.subs[type] = this.subs[type].filter(fn => fn !== currentFn);
        }else {
            this.subs[type] = [];
        }
    }
}

export default new EventBus();