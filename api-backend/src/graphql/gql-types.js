const { UserInputError } = require('apollo-server-errors')
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
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull((GraphQLString))))
        },
        yIntercept: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull((GraphQLFloat))))
        },
        vertex: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull((GraphQLFloat))))
        }
    })
})

const PolyRegType = new GraphQLObjectType({
    name: "Polynomial_Regression",
    description: "This represents a line of best-fit for the data provided.",
    fields: () => ({
        coefficients: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLFloat))),
            description: "Coefficients of the equation"
        },
        equation: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
            description: "Equations (given in two forms)"
        },
        scores: {
            type: GraphQLNonNull(GraphQLObject),
            description: "Scores of the equation (including r, r^2, and more)"
        }
    })
})

const StatsType = new GraphQLObjectType({
    name: "Stats",
    description: "This represents statistical information from a given array of values",
    fields: () => ({
        mean: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Mean of an array of values"
        },
        popsd: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Standard Deviation of an array of values of a population"
        },
        sampsd: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Standard Deviation of an array of values of a sample"
        },
        min: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Minimum value of an array of values"
        },
        q1: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Q1 of an array of values"
        },
        median: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Median of an array of values"
        },
        q3: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Q3 of an array of values"
        },
        max: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Maximum of an array of values"
        },
        iqr: {
            type: GraphQLNonNull(GraphQLFloat),
            description: "Interquartile Range of an array of values"
        },
        skewness: {
            type: GraphQLNonNull(GraphQLString),
            description: "Skewness of an array of values"
        }
    })
})

const DatasetType = new GraphQLObjectType({
    name: "Dataset",
    description: "This represents a set of data generated with the length given in the query",
    fields: () => ({
        values: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLFloat))),
            description: "This represents an array of data within a given range of numbers and with a given length."
        }
    })
})

const PercentageType = new GraphQLObjectType({
    name: "Percentage",
    description: "This represents the percentage of data within a given range of values",
    fields: () => ({
        zscores: {
            type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
            description: 'This represents the zscore(s) of the values given'
        },
        percentage: {
            type: GraphQLNonNull(GraphQLFloat),
            description: 'This represents the percentage of data within a given range of values'
        }
    })
})

module.exports = {
    QuadraticType,
    PolyRegType,
    GraphQLObject,
    StatsType,
    DatasetType,
    PercentageType
}