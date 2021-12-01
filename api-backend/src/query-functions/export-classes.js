const { QuadraticEquation } = require('./solveQuadratic')
const { PolyRegression } = require('./getPolyReg')
const { Stats } = require('./getStats')
const { GenerateDataset } = require('./generateDataset')
const { Percentile } = require('./getPercentile')
const { GeneratePoints } = require('./generatePoints')
const { CubicEquation } = require('./solveCubic')

module.exports = {
    QuadraticEquation,
    PolyRegression,
    Stats,
    GenerateDataset,
    Percentile,
    GeneratePoints,
    CubicEquation
}