const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLScalarType,
    GraphQLError
} = require('graphql')

const GraphQLNumber = new GraphQLScalarType({
    name: "GraphQLNumber",
    parseValue(value) {
        if(typeof value !== 'number') throw new GraphQLError("Value does not represent an integer or float.") // if the number is not an int or a float, return null otherwise return the value
        return value
    }
})

const QuadraticType = new GraphQLObjectType({
    name: "Quadratic_Equation_Roots",
    description: "This represents a quadratic equation's roots.",
    fields: () => ({
        roots: {
            type: GraphQLList(GraphQLNonNull(GraphQLString))
        },
    })
})

module.exports = {
    QuadraticType,
    GraphQLNumber
}