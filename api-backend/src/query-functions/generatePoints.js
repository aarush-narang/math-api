const {
    UserInputError
} = require('apollo-server')
const {
    getRandomFloat
} = require('../util/util')

class GeneratePoints {
    constructor(minX, maxX, len, spread, eq, type) {
        if (!(eq instanceof Array)) throw new UserInputError('Equation must be given in an array of coefficients of a polynomial in ascending order of power. The highest power will be automatically interpreted. put a 0.')

        this.spread = spread
        this.len = len
        this.eq = eq
        this.maxX = maxX
        this.minX = minX
        this.type = type.toLowerCase()
    }
    getPoints() { // To see an example of how this is used, check out pointsQueryTest.py
        const getAdd = (s) => {
            const mid = ((Math.random() - 0.5) * s)
            const max = mid + (getRandomFloat(-1, 1) * mid)
            const min = mid - (getRandomFloat(-1, 1) * mid)

            return (Math.random() * (max - min)) + min
        }

        let xvalues = []
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
        } else if (['log', 'logarithmic'].includes(this.type)) { // log functions
            // [a, b, c, d, e] => f(x) = a*log_b(cx + d) + e. 0's are used for empty variables.
            const getLogYVal = (eq, x) => {
                if (eq.length !== 5) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d, e] => f(x) = a*log_b(cx + d) + e. If a number is not applicable, put a 0.')
                if ((eq[2] * x) + eq[3] < 1) throw new UserInputError('Log of numbers less than 1 are not possible.')
                if (eq[1] < 2) throw new UserInputError('Base cannot be lower than 2')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0, otherwise it is not a log function.')

                return (eq[0] * (Math.log((eq[2] * x) + eq[3]) / Math.log(eq[1]))) + eq[4] // uses base-change formula to solve for the y value
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getLogYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['logistic', 'logis'].includes(this.type)) { // logistic functions
            // [a, b, c, d] => f(x) = a / b + c * e^(d * x). 0's are used for empty variables. In this equation, e is not a variable but is an irrational number appx. equal to 2.718. 
            const getLogisticYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a / b + c * e^(d * x). If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make a logistic function')
                if (eq[1] < 1) throw new UserInputError('"b" cannot be less than 1 in order to make a logistic function')
                if (eq[2] < 1) throw new UserInputError('"c" cannot be less than 1 in order to make a logistic function')
                if (eq[3] === 0) throw new UserInputError('"d" cannot be equal to 0 in order to make a logistic function')

                return eq[0] / (eq[1] + (eq[2] * (Math.E ** (eq[3] * x))))
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getLogisticYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['sin', 'sine'].includes(this.type)) { // sin functions
            // [a, b, c, d] => f(x) = a * sin(b * x + c) + d. 0's are used for empty variables.
            const getSinYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * sin(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make a sin function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make a sin function')

                return (eq[0] * Math.sin(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getSinYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['cos', 'cosine'].includes(this.type)) { // cos functions
            // [a, b, c, d] => f(x) = a * cos(b * x + c) + d. 0's are used for empty variables.
            const getCosYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * cos(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make a cos function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make a cos function')

                return (eq[0] * Math.cos(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getCosYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['tan', 'tangent'].includes(this.type)) { // tan functions
            // [a, b, c, d] => f(x) = a * tan(b * x + c) + d. 0's are used for empty variables.
            const getTanYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * tan(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make a tan function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make a tan function')

                return (eq[0] * Math.tan(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getTanYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['asin', 'arcsin', 'arcsine'].includes(this.type)) { // arcsin functions
            // [a, b, c, d] => f(x) = a * asin(b * x + c) + d. 0's are used for empty variables.
            xvalues = xvalues.filter(val => { // precaution in case values outside the range of the arcsin function are produced
                if (val < 1 / this.eq[1] && val > 1 / -this.eq[1]) return val
                return false
            })
            const getArcsinYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * asin(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make an asin function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make an asin function')

                return (eq[0] * Math.asin(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getArcsinYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['acos', 'arccos', 'arccosine'].includes(this.type)) { // arccos functions
            // [a, b, c, d] => f(x) = a * acos(b * x + c) + d. 0's are used for empty variables.
            xvalues = xvalues.filter(val => { // precaution in case values outside the range of the arccos function are produced
                if (val < 1 / this.eq[1] && val > 1 / -this.eq[1]) return val
                return false
            })
            const getArccosYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * acos(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make an acos function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make an acos function')

                return (eq[0] * Math.acos(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getArccosYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['atan', 'arctan', 'arctangent'].includes(this.type)) { // arctan functions
            // [a, b, c, d] => f(x) = a * atan(b * x + c) + d. 0's are used for empty variables.
            const getArctanYVal = (eq, x) => {
                if (eq.length !== 4) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d] => f(x) = a * atan(b * x + c) + d. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make an atan function')
                if (eq[1] === 0) throw new UserInputError('"b" cannot be equal to 0 in order to make an atan function')

                return (eq[0] * Math.atan(eq[1] * (x + eq[2]))) + eq[3]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getArctanYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
            }
        } else if (['exp', 'expo', 'exponential'].includes(this.type)) {
            // [a, b, c, d, e] => f(x) = a * b ^ (c * x + d) + e. 0's are used for empty variables.
            const getExpoYVal = (eq, x) => {
                if (eq.length !== 5) throw new UserInputError('Equation was not provided in proper format. [a, b, c, d, e] => f(x) = a * b ^ (c * x + d) + e. If a number is not applicable, put a 0.')
                if (eq[0] === 0) throw new UserInputError('"a" cannot be equal to 0 in order to make an exponential function')
                if (eq[1] < 2) throw new UserInputError('"b", or the base, cannot be less than 2 in order to make an exponential function')
                if (eq[2] === 0) throw new UserInputError('"c" cannot be equal to 0 in order to make an exponential function')
                
                return (eq[0] * (eq[1]**(eq[2] * (x + eq[3])))) + eq[4]
            }
            for (let xindex = 0; xindex < xvalues.length; xindex++) {
                yvalues.push(getExpoYVal(this.eq, xvalues[xindex]) + getAdd(this.spread))
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