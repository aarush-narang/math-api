const {
    UserInputError
} = require('apollo-server')

class QuadEqSolver {
    constructor(y = 0, a = 0, b = 0, c = 0) { // quadratic equation coefficients given (in form y = ax^2 + bx + c)
        if (a === 0) throw new UserInputError('EQUATION_EXCEPTION: "a" must equal to a value greater than 0')
        if (b === 0 && c === 0) throw new UserInputError("EQUATION_EXCEPTION: At least one of the coefficients must have a value greater than 0 to solve the quadratic equation.")
        if (y != 0) c -= y // if y is not equal to 0, subtract y from both sides to make one side equal to 0
        this.a = a
        this.b = b
        this.c = c
    }
    getRoots() {
        let r1, r2
        const disc =  this.getDiscriminant() 

        if (disc > 0) { // if there are two positive, rational roots
            r1 = (-this.b + Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / 2 * this.a
            r2 = (-this.b - Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / 2 * this.a
        } else if (disc === 0) { // if there is a positive, rational double root
            r1 = r2 = (-this.b + Math.sqrt(this.b ** 2 - (4 * this.a * this.c))) / 2 * this.a
        } else { // if there are imaginary roots
            const b = -this.b / 2 * this.a
            let sqrt = (Math.sqrt(Math.abs(this.b ** 2 - (4 * this.a * this.c))) / 2)
            sqrt = sqrt === 1 ? sqrt = 'i' : sqrt = sqrt.toString() + 'i'
            r1 = `${b} + ${sqrt}`
            r2 = `${b} - ${sqrt}`
        }

        return [r1, r2]
    }
    getDiscriminant() {
        return this.b ** 2 - 4 * this.a * this.c // discriminant
    }
}

module.exports = {
    QuadEqSolver
}