const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')
const {
    PasswordType,
    UUIDType,
} = require('./gql-types')
const {
    Password,
    UUID
} = require('../query-functions/export-classes')
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
                    const resp = passwordGenerate.generatePassword()
                    return resp
                } catch (error) {
                    return new UserInputError(error.message)
                }
            }
        },
        generateUUID: {
            type: UUIDType,
            description: "Randomly or not randomly generated UUID based on the query options provided.",
            args: {
                version: {
                    type: GraphQLInt,
                    defaultValue: 4
                },
                name: {
                    type: GraphQLString,
                    defaultValue: "" // just use empty string if this is empty (assuming version 5)
                },
                namespace: {
                    type: GraphQLString,
                    defaultValue: "" // if empty, randomly generate a uuid using v4 and use that as namespace. (assuming version 5)
                }
            },
            resolve: (parent, args) => {
                try {
                    const uuidGenerate = new UUID(args.version, args.name, args.namespace)
                    const uuid = uuidGenerate.generateUUID()
                    return {
                        uuid
                    }
                } catch (error) {
                    return new UserInputError(error.message)
                }
            }
        }
    })
})

module.exports = {
    RootQueryType,
    // RootMutationType,
}