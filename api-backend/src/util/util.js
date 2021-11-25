function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class PerfTimer {
    constructor(precision) {
        this.precision = precision ? precision : 5
    }
    start() {
        this.startTime = performance.now()
    }
    end() {
        const endTime = performance.now()
        console.log(`Generated in ${(endTime - this.startTime).toPrecision(5)} ms`)
    }
}


module.exports = {
    getRandomFloat,
    getRandomInt,
    PerfTimer
}