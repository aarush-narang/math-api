const {
    UserInputError
} = require('apollo-server')

const {
    getRandomFloat,
    getRandomInt,
} = require('../util/util')

class GenerateDataset {
    constructor(min, max, length, float, precision, order) {
        if (!float && (!Number.isInteger(min) || !Number.isInteger(max))) throw new UserInputError('Min and max values must also be of type "int" if float is "false".')
        if (precision > 100) throw new UserInputError('The value of "precision" must be between 1 and 100.')
        if (length <= 0) throw new UserInputError('Length must be greater than 0.')
        if (length > 1000000 && !float) throw new UserInputError('For performance reasons, length cannot be greater than 1000000 if "float" is false')
        if (length > 500000 && float) throw new UserInputError('For performance reasons, length cannot be greater than 500000 if "float" is true')

        this.min = min
        this.max = max
        this.length = length
        this.float = float
        this.precision = precision
        this.order = order
    }
    generate() {
        let values
        if (this.float) values = Array.from({
            length: this.length
        }, () => getRandomFloat(this.min, this.max).toPrecision(this.precision))
        else values = Array.from({
            length: this.length
        }, () => getRandomInt(this.min, this.max))

        if (this.order === -1) values = values.sort((a, b) => b - a)
        else if (this.order === 1) values = values.sort((a, b) => a - b)

        return {
            values
        }
    }
}

module.exports = {
    GenerateDataset
}