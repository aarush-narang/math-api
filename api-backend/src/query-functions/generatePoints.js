const {
    UserInputError
} = require('apollo-server')
const { getRandomFloat } = require('../util/util')

class GeneratePoints {
    constructor(minX, maxX, len, spread, eq, type) {
        if (!(eq instanceof Array)) throw new UserInputError('Equation must be given in an array of coefficients of a polynomial in ascending order of power. The highest power will be automatically interpreted. 0\'s are allowed.')
        console.log(type)
        this.spread = spread
        this.len = len
        this.eq = eq
        this.maxX = maxX
        this.minX = minX
        this.type = type
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

        const xvalues = []
        const yvalues = []

        for(let x = this.minX; x < this.maxX; x += (this.maxX - this.minX)/this.len) { // gets x values
            const xval = Math.random() + x
            xvalues.push(xval)
        }
        for(let xindex = 0; xindex < xvalues.length; xindex++) { // gets y values from x values
            yvalues.push(getYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
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