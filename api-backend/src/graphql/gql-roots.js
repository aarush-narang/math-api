const {
    GraphQLObjectType,
} = require('graphql')
const {
    QuadraticType,
    GraphQLNumber,
} = require('./gql-types')
const {
    QuadEqSolver
} = require('../query-functions/export-classes')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        solveQuadratic: {
            type: QuadraticType,
            description: "Solve a quadratic equation that is in the form y = ax^2 + bx + c.",
            args: {
                y: {
                    type: GraphQLNumber,
                },
                a: {
                    type: GraphQLNumber,
                },
                b: {
                    type: GraphQLNumber,
                },
                c: {
                    type: GraphQLNumber,
                }
            },
            resolve: (parent, args) => {
                try {
                    const quadratic = new QuadEqSolver(args.y, args.a, args.b, args.c)
                    const roots = quadratic.getRoots()
                    return {
                        roots
                    }
                } catch (error) {
                    console.log(error)
                    return error
                }
            }
        }
    })
})

module.exports = {
    RootQueryType,
}