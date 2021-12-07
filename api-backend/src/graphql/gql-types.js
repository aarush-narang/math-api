const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLScalarType,
    GraphQLError,
    GraphQLFloat,
} = require('graphql')

const GraphQLObject = new GraphQLScalarType({
    name: "GraphQLObject",
    description: "This represents an object",
    parseValue(value) {
        if (!(value instanceof Object)) throw new GraphQLError("Value does not represent an object") // if the value is not an object, throw error, otherwise return the value
        return value
    }
})

const QuadraticType = new GraphQLObjectType({
    name: "Quadratic",
    description: "This represents a quadratic equation's roots, y-int, and vertex.",
    fields: () => ({
        roots: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull((GraphQLString))))
        },
        yIntercept: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull((GraphQLFloat))))
        },
        vertex: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull((GraphQLFloat))))
        }
    })
})

const CubicType = new GraphQLObjectType({
    name: "Cubic",
    description: "This represents a cubic equation's roots and y-int.",
    fields: () => ({
        roots: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull((GraphQLFloat))))
        },
        yIntercept: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull((GraphQLFloat))))
        }
    })
})

const PolyRegType = new GraphQLObjectType({
    name: "Polynomial_Regression",
    description: "This represents a line of best-fit for the data provided.",
    fields: () => ({
        coefficients: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "Coefficients of the equation"
        },
        equation: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
            description: "Equations (given in two forms)"
        },
        scores: {
            type: new GraphQLNonNull(GraphQLObject),
            description: "Scores of the equation (including r, r^2, and more)"
        }
    })
})

const StatsType = new GraphQLObjectType({
    name: "Stats",
    description: "This represents statistical information from a given array of values",
    fields: () => ({
        mean: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Mean of an array of values"
        },
        popsd: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Standard Deviation of an array of values of a population"
        },
        sampsd: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Standard Deviation of an array of values of a sample"
        },
        min: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Minimum value of an array of values"
        },
        q1: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Q1 of an array of values"
        },
        median: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Median of an array of values"
        },
        q3: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Q3 of an array of values"
        },
        max: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Maximum of an array of values"
        },
        iqr: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Interquartile Range of an array of values"
        },
        skewness: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Skewness of an array of values"
        }
    })
})

const DatasetType = new GraphQLObjectType({
    name: "Dataset",
    description: "This represents a set of data generated with the length given in the query",
    fields: () => ({
        values: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "This represents an array of data within a given range of numbers and with a given length."
        }
    })
})

const DatasetOrderInputType = new GraphQLScalarType({
    name: "DatasetOrderInputType",
    description: "This represents a value of 1, 0, or -1. 1 means that the order will be ascending, -1 means descending, while 0 leaves the values in a random order",
    parseValue(value) {
        if (![-1, 0, 1].includes(value)) throw new GraphQLError("Order value is not equal to -1, 0, or 1") // if the value is not equal to -1, 0, or 1 throw error
        return value
    }
})

const PercentileType = new GraphQLObjectType({
    name: "Percentage",
    description: "This represents the percentage of data within a given range of values",
    fields: () => ({
        zscores: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents the zscore(s) of the values given'
        },
        percentile: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'This represents the percentage of data within a given range of values'
        }
    })
})

const PointsType = new GraphQLObjectType({
    name: "Points",
    description: "This represents randomly generated points in an array of a given length around a given line with a given spread",
    fields: () => ({
        xvalues: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents an array of x-values of coordinate points in which each index corresponds with the same index of the array of y-values returned'
        },
        yvalues: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents an array of y-values of coordinate points in which each index corresponds with the same index of the array of x-values returned'
        }
    })
})

const graphs = [ // different types of graphs the query will be able to handle (most are not done yet)
    'polynomial', // done
    'poly', // same as 1
    'log', // done
    'logistic', 
    'sin', 
    'cos', 
    'tan', 
    'asin', 
    'acos', 
    'atan',
]

const PointsGraphsType = new GraphQLScalarType({
    name: "PointsGraphsType",
    description: "This represents the types of graphs the generatePoints query can create.",
    parseValue(value) { // add other types of graphs
        if (!graphs.includes(value)) throw new GraphQLError(`Graph type "${value}" is not supported`) // if the value is not a supported graph type, throw error, otherwise return the value
        return value
    }
})

const TriangleType = new GraphQLObjectType({
    name: "Triangle",
    description: "This represents an array of lengths and degrees of a Triangle given 3 lengths or degrees or a mixture of both.",
    fields: () => ({
        sides: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "The sides will come in the order of [a, b, c]"
        },
        angles: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "The angles will come in the order of [A, B, C]"
        },
        area: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Area of the (now) solved triangle"
        },
        perimeter: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Perimeter of the (now) solved triangle"
        },
        semiPerimeter: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "Semi-Perimeter of the (now) solved triangle"
        },
        heights: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "The heights will come in the order of [height from angle a, height from angle b, height from angle c]. The height represents the distance between an angle and the opposite side, creating a right angle with the side."
        },
        medians: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
            description: "The medians will come in the order of [median from angle a, median from angle b, median from angle c]. The median represents the distance between an angle and the opposite side, connecting in the middle of the side."
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The name of the triangle (ex: acute isosceles triangle, or obtuse scalene triangle)"
        }
    })
})

module.exports = {
    QuadraticType,
    CubicType,
    PolyRegType,
    GraphQLObject,
    StatsType,
    DatasetType,
    DatasetOrderInputType,
    PercentileType,
    PointsType,
    TriangleType,
    PointsGraphsType,
}