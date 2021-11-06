const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')


const PasswordType = new GraphQLObjectType({
    name: "Password",
    description: "This represents a randomly generated password based on the query options provided.",
    fields: () => ({
        password: {
            type: GraphQLNonNull(GraphQLString)
        },
        strength: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const UUIDType = new GraphQLObjectType({
    name: "UUID",
    description: "This represents a randomly generated UUID.",
    fields: () => ({
        uuid: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

module.exports = {
    PasswordType,
    UUIDType
}