const {
    UserInputError
} = require('apollo-server')

class Percentile {
    constructor(min, max, sd, mean) {
        if (!min && !max) throw new UserInputError('At least one value, maximum or minimum, must be provided.')
        if (min < 0 || max < 1 || sd < 0 || mean < 0) throw new UserInputError('All inputs must be positive.')
        if(max < min) throw new UserInputError('Max value cannot be less than min value.')
        
        this.min = min
        this.max = max
        this.sd = sd
        this.mean = mean
    }
    getPercentile() {
        const calculateZScore = (value, sd, mean) => { // calculates zscore
            if(!value) return null
            return ((value - mean) / sd).toPrecision(3)
        }
        const calculatePercentile = (z) => { // calculates percentile with zscore
            if (z < -6.5) return 0.0;
            if (z > 6.5) return 1.0;

            let factK = 1;
            let sum = 0;
            let term = 1;
            let k = 0;
            let loopStop = Math.exp(-23);

            while (Math.abs(term) > loopStop) {
                term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
                sum += term;
                k++;
                factK *= k;
            }

            sum += 0.5;

            return sum;
        }
        const z1 = calculateZScore(this.min, this.sd, this.mean) // zscore of left value
        const z2 = calculateZScore(this.max, this.sd, this.mean) // zscore of right value
        const minP = calculatePercentile(z1) || null
        const maxP = calculatePercentile(z2) || null

        if(!this.min) return { percentile: Number(maxP.toPrecision(4)), zscores: [z1, z2] }
        else if(!this.max) return { percentile: Number((1 - minP).toPrecision(4)), zscores: [z1, z2] }
        else return { percentile: Number((maxP - minP).toPrecision(4)), zscores: [z1, z2] }
    }
}

module.exports = {
    Percentile
}