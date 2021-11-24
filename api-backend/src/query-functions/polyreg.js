const {
    UserInputError
} = require('apollo-server')
const PolynomialRegression = require('ml-regression-polynomial')

class PolyRegression {
    constructor(x, y, highestDegree) {
        if(!(x instanceof Array) || !(y instanceof Array)) throw new UserInputError("X and Y values must be entered in an array. The first, second, third, etc. values in the array of x values corresponds with the first, second, third, etc. values of the array of y values\nex: x-values -> [1, 2, 3], y-values -> [3, 2, 1] = (1, 3); (2, 2); (3, 1)")
        if(typeof highestDegree !== 'number') throw new UserInputError('highestDegree must be of type "int"')
        if(x.length !== y.length) throw new UserInputError('Array of X values must be equal in length to Array of Y values')
        if(highestDegree >= 60) throw new UserInputError("Highest degree cannot be greater than or equal to 60.")
        
        this.x = x
        this.y = y
        this.deg = highestDegree
    }

    getRegression() {
        const regression = new PolynomialRegression(this.x, this.y, this.deg);

        return {
            coefficients: regression.coefficients,
            equation: [regression.toString(), regression.toLaTeX()],
            scores: regression.score(this.x, this.y)
        }
    }
}

module.exports = {
    PolyRegression
}