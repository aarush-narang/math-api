const { UserInputError } = require('apollo-server-errors')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLScalarType,
    GraphQLError,
} = require('graphql')

const GraphQLNumber = new GraphQLScalarType({
    name: "GraphQLNumber",
    description: "This represents an int or a float",
    parseValue(value) {
        if (typeof value !== 'number') throw new GraphQLError("Value does not represent an integer or float.") // if the number is not an int or a float, return null otherwise return the value
        return value
    }
})

const GraphQLObject = new GraphQLScalarType({
    name: "GraphQLObject",
    description: "This represents an object",
    parseValue(value) {
        if (!(value instanceof Object)) throw new GraphQLError("Value does not represent an object") // if the number is not an int or a float, return null otherwise return the value
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
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull((GraphQLNumber))))
        },
        vertex: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull((GraphQLNumber))))
        }
    })
})

const PolyRegType = new GraphQLObjectType({
    name: "Polynomial_Regression",
    description: "This represents a line of best-fit for the data provided.",
    fields: () => ({
        coefficients: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLNumber))),
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
            type: GraphQLNonNull(GraphQLNumber),
            description: "Mean of an array of values"
        },
        popsd: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Standard Deviation of an array of values of a population"
        },
        sampsd: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Standard Deviation of an array of values of a sample"
        },
        min: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Minimum value of an array of values"
        },
        q1: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Q1 of an array of values"
        },
        median: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Median of an array of values"
        },
        q3: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Q3 of an array of values"
        },
        max: {
            type: GraphQLNonNull(GraphQLNumber),
            description: "Maximum of an array of values"
        },
        iqr: {
            type: GraphQLNonNull(GraphQLNumber),
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
        data: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLNumber))),
            description: "This represents an array of data within a given range of numbers and with a given length."
        }
    })
})

module.exports = {
    QuadraticType,
    GraphQLNumber,
    PolyRegType,
    GraphQLObject,
    StatsType,
    DatasetType
}