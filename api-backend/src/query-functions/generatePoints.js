const {
    UserInputError
} = require('apollo-server')
const { getRandomFloat } = require('../util/util')

class GeneratePoints {
    constructor(spread, len, eq, minX, maxX) {
        if (!(eq instanceof Array)) throw new UserInputError('Equation must be given in an array of coefficients of a polynomial in ascending order of power. The highest power will be automatically interpreted. 0\'s are allowed.')

        this.spread = spread
        this.len = len
        this.eq = eq
        this.maxX = maxX
        this.minX = minX
    }
    getPoints() { // To see an example of how this is used, check out pointsQueryTest.py
        const getYVal = (eq, x) => {
            let sum = 0
            for (let i = 0; i < eq.length; i++) {
                sum += eq[i] * x ** i
            }
            return sum
        }
        const getAdd = (s) => {
            const mid = ((Math.random() - 0.5) * s)
            const max = mid + (getRandomFloat(-1, 1)*mid)
            const min = mid - (getRandomFloat(-1, 1)*mid)
            
            return (Math.random() * (max-min)) + min
        }

        const xpoints = []
        const ypoints = []

        for(let x = this.minX; x < this.maxX; x += (this.maxX - this.minX)/this.len) { // gets x values
            const xval = Math.random() + x
            xpoints.push(xval)
        }
        for(let xindex = 0; xindex < xpoints.length; xindex++) { // gets y values from x values
            ypoints.push(getYVal(this.eq, xpoints[xindex]) + getAdd(this.spread))
        }

        return {
            xpoints,
            ypoints
        }
    }
}

module.exports = {
    GeneratePoints
}