class TimersManager {
    #getTimer;
    #log;
    #globalTimer;

    constructor() {
        this.timers = [];
        this.timersCallbackLogs = [];
        this.activeTimers = {};
        this.delayLimit = 5000;
        this.globalTimeout = 10000;
        this.maxTimeJobOut = 0;

        this.#getTimer = (timerName) => this.timers.find(({name}) => name === timerName);
        this.#log = (timer) => {
            const {name, job, args} = timer;

            let out = '';

            try {
                out = job(...args);
            } catch ({name, message, stack}) {
                out = {
                    name,
                    message,
                    stack
                };
            }

            this.timersCallbackLogs.push({
                name,
                in: [...args],
                out,
                created: new Date()
            });
        };
        this.#globalTimer = () => {
            setTimeout(() => {
                this.timers.forEach((timer)=>{
                    this.remove(timer.name);
                });
            }, this.maxTimeJobOut + this.globalTimeout);
        }
    }
    add(timer, ...args) {
        this.validate(timer);

        const validTimer = {
            ...timer,
            args
        };

        this.timers.push(validTimer);

        if(timer.delay > this.maxTimeJobOut){
            this.maxTimeJobOut = timer.delay;
        }

        return this;
    }
    remove(timerName) {
        this.pause(timerName);
        this.timers = this.timers.filter(({name}) => name !== timerName );
    }
    start() {
        this.timers.forEach((timer)=>{
            this.resume(timer.name)
        });

        this.#globalTimer();
    }
    stop() {
        this.timers.forEach((timer)=>{
            this.pause(timer.name);
        })
    }
    pause(timerName) {
        const timer = this.#getTimer(timerName);

        if(timer.interval){
            clearInterval(this.activeTimers[timerName]);
        }else {
            clearTimeout(this.activeTimers[timerName]);
        }
    }
    resume(timerName) {
        const timer = this.#getTimer(timerName);

        if(timer.interval){
            this.activeTimers[timerName] = setInterval(this.#log,timer.delay,timer);
        } else {
            this.activeTimers[timerName] = setTimeout(this.#log,timer.delay,timer);
        }
    }

    validate(timer){
        if(timer.name === void 0){
            throw new Error('Timer "name" is require!')
        }
        if(timer.name === ''){
            throw new Error('Timer should be not empty!')
        }
        if(typeof timer.name !== 'string'){
            throw new Error('Timer should be string type!')
        }

        if(timer.delay === void 0){
            throw new Error('Timer "delay" is require!')
        }
        if(typeof timer.delay !== 'number'){
            throw new Error('Timer should be number type!')
        }
        if(timer.delay < 0 || timer.delay > this.delayLimit){
            throw new Error(`Timer delay limit should be in range from 0 to ${this.delayLimit}!`)
        }

        if(timer.interval === void 0){
            throw new Error('Timer "interval" is require!')
        }
        if(typeof timer.interval !== 'boolean'){
            throw new Error('Timer should be boolean type!')
        }

        if(!timer.job){
            throw new Error('Timer "job" is require!')
        }
        if(typeof timer.job !== 'function'){
            throw new Error('Timer should be function type!')
        }

        const isTimerExist = this.timers.find(({name})=>name === timer.name);

        if(isTimerExist){
            throw new Error('Timer should have uniq name in list!')
        }

        if(Object.keys(this.activeTimers).length > 0){
            throw new Error('You can`t add timer when time manager started!')
        }
    }
    print() {
        const timOut = setInterval(() => {
            if(this.timersCallbackLogs.length === this.timers.length){
                console.log(this.timersCallbackLogs);
                clearInterval(timOut);
            }
        })
    }
}
const manager = new TimersManager();
const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: () => {
        throw new Error('We have a problem!')
    }
};
const t2 = {
    name: 't2',
    delay: 1000,
    interval: false,
    job: (a, b) => (a + b)
};
const t3 = {
    name: 't3',
    delay: 5000,
    interval: false,
    job: (a, b, d) => (a + b + d)
};
manager.add(t1);
manager.add(t2, 1, 2).add(t3, 'Hello ', 'world ','!')
manager.start();
manager.print();
console.log(1);
// manager.remove('t3');
// manager.stop();
// manager.pause('t3');
// manager.resume('t3');
