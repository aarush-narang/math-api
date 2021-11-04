const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')
const {
    PasswordType,
} = require('./gql-types')
const {
    Password
} = require('../query-functions/random-password')
const {
    UserInputError
} = require('apollo-server')


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        generatePassword: {
            type: PasswordType,
            description: 'Randomly generated password based on the query options provided.',
            args: {
                uppercase: {
                    type: GraphQLBoolean,
                    defaultValue: true
                },
                lowercase: {
                    type: GraphQLBoolean,
                    defaultValue: true
                },
                numbers: {
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                symbols: {
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                includeCharacters: {
                    type: GraphQLString,
                    defaultValue: ''
                },
                excludeCharacters: {
                    type: GraphQLString,
                    defaultValue: ''
                },
                length: {
                    type: GraphQLInt,
                    defaultValue: 15
                },
            },
            resolve: (parent, args) => {
                try {
                    const passwordGenerate = new Password(args.uppercase, args.lowercase, args.numbers, args.symbols, args.includeCharacters, args.excludeCharacters, args.length)
                    const password = passwordGenerate.generatePassword()
                    return {
                        password
                    }
                } catch (error) {
                    return new UserInputError(error.message)
                }
            }
        },
    })
})

module.exports = {
    RootQueryType,
    // RootMutationType,
}