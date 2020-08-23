class TimersManager {
    #getTimer;

    constructor() {
        this.timers = [];
        this.activeTimers = {};
        this.delayLimit = 5000;

        this.#getTimer = (timerName) => this.timers.find(({name}) => name === timerName);
    }
    add(timer, ...args) {
        this.validate(timer);

        const validTimer = {
            ...timer,
            args
        };

        this.timers.push(validTimer);

        return this;
    }
    remove(timerName) {
        this.pause(timerName);
        this.timers = this.timers.filter(({name}) => name !== timerName );
    }
    start() {
        this.timers.forEach((timer)=>{
            this.resume(timer.name)
        })
    }
    stop() {
        this.timers.forEach((timer)=>{
            this.pause(timer.name)
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
            this.activeTimers[timerName] = setInterval(timer.job,timer.delay,...timer.args)
        } else {
            this.activeTimers[timerName] = setTimeout(timer.job,timer.delay,...timer.args)
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
}
const manager = new TimersManager();
const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: () => { console.log('t1') }
};
const t2 = {
    name: 't2',
    delay: 1000,
    interval: false,
    job: (a, b) => {
        console.log(a + b)
    }
};
const t3 = {
    name: 't3',
    delay: 3000,
    interval: false,
    job: (a, b, d) => {
        console.log(a + b + d)
    }
};
manager.add(t1);
manager.add(t2, 1, 2).add(t3, 'Hello ', 'world ','!')
manager.start();
console.log(1);
// manager.remove('t3');
// manager.stop();
manager.pause('t3');
// manager.resume('t3');
