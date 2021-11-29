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
        if (!(value instanceof Object)) throw new GraphQLError("Value does not represent an object") // if the number is not an object, throw error, otherwise return the value
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

const PercentageType = new GraphQLObjectType({
    name: "Percentage",
    description: "This represents the percentage of data within a given range of values",
    fields: () => ({
        zscores: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents the zscore(s) of the values given'
        },
        percentage: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'This represents the percentage of data within a given range of values'
        }
    })
})

const PointsType = new GraphQLObjectType({
    name: "Points",
    description: "This represents randomly generated points in an array of a given length around a given line with a given spread",
    fields: () => ({
        xpoints: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents an array of x-values of coordinate points in which each index corresponds with the same index of the array of y-values returned'
        },
        ypoints: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
            description: 'This represents an array of y-values of coordinate points in which each index corresponds with the same index of the array of x-values returned'
        }
    })
})

module.exports = {
    QuadraticType,
    PolyRegType,
    GraphQLObject,
    StatsType,
    DatasetType,
    PercentageType,
    PointsType
}