const {
    UserInputError
} = require('apollo-server')

class QuadraticEquation {
    constructor(y, a, b, c) { // quadratic equation coefficients given (in form y = ax^2 + bx + c)
        if (a === 0) throw new UserInputError('Coefficient "a" must be a value not equal to 0')
        if (a === 0 && b === 0 && c === 0) throw new UserInputError("At least one of the coefficients must have a value greater than 0 to solve the quadratic equation.")
        if (y != 0) c -= y // if y is not equal to 0, subtract y from both sides to make one side equal to 0
        this.a = a
        this.b = b
        this.c = c
    }
    // y = ax^2 + bx + c
    solveEquation() {
        const vertex = this._getVertex()
        const yIntercept = [0, this.c] // Array(Int)
        const roots = this._getRoots()
        
        return {
            roots,
            yIntercept,
            vertex
        }
    }
    _getVertex() { // returns Array(Int)
        const x = -this.b / (2 * this.a) // -b/2a
        const y = (this.a * x**2) + (this.b*x) + this.c // plug in to find y
        return [x, y]
    }
    _getRoots() { // returns Array(String)
        let r1, r2
        const disc = this.b ** 2 - (4 * this.a * this.c)

        if (disc > 0) { // if there are two positive, rational roots
            r1 = (-this.b + Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / (2 * this.a)
            r2 = (-this.b - Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / (2 * this.a)
        } else if (disc === 0) { // if there is a positive, rational double root
            r1 = r2 = (-this.b + Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / (2 * this.a)
        } else { // if there are imaginary roots
            const b = -this.b / (2 * this.a)
            let sqrt = (Math.sqrt(Math.abs((this.b ** 2) - (4 * this.a * this.c)))) / (2 * this.a)
            sqrt = sqrt === 1 ? sqrt = 'i' : sqrt = sqrt.toString() + 'i'
            r1 = `${b} + ${sqrt}`
            r2 = `${b} - ${sqrt}`
        }

        return [r1, r2]
    }
}

module.exports = {
    QuadraticEquation
}