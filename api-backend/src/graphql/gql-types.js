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
        }
    })
})

module.exports = {
    PasswordType,
}