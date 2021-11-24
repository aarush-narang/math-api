const {
    UserInputError
} = require('apollo-server')

class Stats {
    constructor(values) {
        if (!(values instanceof Array)) throw new UserInputError("Values must be entered in an array.")

        // sort numbers in ascending order
        this.values = values.sort((a, b) => a - b)
    }
    getStats() {
        const {
            min,
            q1,
            median,
            q3,
            max,
            iqr
        } = this._getMedianQsIQR()
        const {
            mean,
            popsd,
            sampsd
        } = this._getMeanSD()
        const skewness = this._getSkewness()

        return {
            mean,
            popsd,
            sampsd,
            min,
            q1,
            median,
            q3,
            max,
            iqr,
            skewness
        }
    }
    _getMedianQsIQR() {
        const getMedian = (arr) => {
            const index = Math.ceil(arr.length / 2) - 1 // find the index for median
            if (arr.length % 2 === 0) { //  if the length is even
                const prevNum = arr[index]
                const nextNum = arr[index + 1]
                const median = (prevNum + nextNum) / 2
                return median
            } else { // if the length is odd
                const median = arr[index]
                return median
            }
        }
        const getQs = (arr) => {
            const midIndex = arr.length % 2 !== 0 ? Math.floor(arr.length / 2) : Math.ceil(arr.length / 2)

            if (arr.length % 2 !== 0) arr.splice(midIndex, 1) // if length is odd, it will remove center element

            const firstHalf = arr.slice(0, midIndex)
            const secondHalf = arr.slice(midIndex, arr.length)

            const q1 = getMedian(firstHalf)
            const q3 = getMedian(secondHalf)
            return {
                q1,
                q3
            }
        }

        // median
        const median = getMedian([...this.values]) // making a copy of this.values to make sure it does not get modified
        this.median = median

        // qs
        const {
            q1,
            q3
        } = getQs([...this.values])

        // iqr
        const iqr = q3 - q1

        // min and max
        const min = this.values[0]
        const max = this.values[this.values.length-1]

        return {
            min,
            q1,
            median,
            q3,
            max,
            iqr,
        }
    }
    _getMeanSD() {
        // mean
        const mean = this.values.reduce((a, b) => a + b) / this.values.length
        this.mean = mean

        // standard deviation
        let sum = 0
        for (let i = 0; i < this.values.length; i++) {
            sum += (this.values[i] - mean)**2
        }

        const popsd = Math.sqrt(sum / (this.values.length))
        const sampsd = Math.sqrt(sum / (this.values.length - 1))

        return {
            mean,
            popsd,
            sampsd
        }
    }
    _getSkewness() {
        if(this.mean > this.median) return 'skewed right'
        else if(this.mean < this.median) return 'skewed left'
        else return 'uniform'
    }
}

module.exports = {
    Stats
}