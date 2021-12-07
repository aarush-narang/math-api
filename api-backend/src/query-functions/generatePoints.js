const {
    UserInputError
} = require('apollo-server')
const {
    getRandomFloat
} = require('../util/util')

class GeneratePoints {
    constructor(minX, maxX, len, spread, eq, type) {
        if (!(eq instanceof Array)) throw new UserInputError('Equation must be given in an array of coefficients of a polynomial in ascending order of power. The highest power will be automatically interpreted. 0\'s are allowed.')

        this.spread = spread
        this.len = len
        this.eq = eq
        this.maxX = maxX
        this.minX = minX
        this.type = type
    }
    getPoints() { // To see an example of how this is used, check out pointsQueryTest.py
        const getAdd = (s) => {
            const mid = ((Math.random() - 0.5) * s)
            const max = mid + (getRandomFloat(-1, 1) * mid)
            const min = mid - (getRandomFloat(-1, 1) * mid)

            return (Math.random() * (max - min)) + min
        }

        const xvalues = []
        const yvalues = []

        // gets x values
        for (let x = this.minX; x < this.maxX; x += (this.maxX - this.minX) / this.len) {
            const xval = Math.random() + x
            xvalues.push(xval)
        }

        // gets y values from x values
        if (['poly', 'polynomial'].includes(this.type)) { // polynomial functions
            const getPolyYVal = (eq, x) => {
                let sum = 0
                for (let i = 0; i < eq.length; i++) {
                    sum += eq[i] * x ** i
                }
                return sum
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getPolyYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['log'].includes(this.type)) { // log functions
            // [a, b, c, d, e] => f(x) = a*log_b(cx + d) + e. 0's are used for empty variables.
            const getLogYVal = (eq, x) => {
                if (eq.length !== 5) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d, e] => f(x) = a*log_b(cx + d) + e. If not applicable, 0\'s are allowed.')
                if ((eq[2] * x) + eq[3] < 1) throw new UserInputError('Log of numbers less than 1 are not possible.')
                if (eq[1] < 2) throw new UserInputError('Base cannot be lower than 2')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0, otherwise it is not a log function.')

                return (eq[0] * (Math.log((eq[2] * x) + eq[3]) / Math.log(eq[1]))) + eq[4] // uses base-change formula to solve for the y value
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getLogYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        }

        return {
            xvalues,
            yvalues
        }
    }
}

module.exports = {
    GeneratePoints
}