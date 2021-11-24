const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql')
const {
    QuadraticType,
    GraphQLNumber,
    PolyRegType,
    StatsType,
} = require('./gql-types')
const {
    QuadraticEquation,
    PolyRegression,
    Stats
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
                    const quadratic = new QuadraticEquation(args.y, args.a, args.b, args.c)
                    return quadratic.solveEquation()
                } catch (error) {
                    return error
                }
            }
        },
        getPolyReg: {
            type: PolyRegType,
            description: 'Get a polynomial regression equation along with r^2 values and more.',
            args: {
                x: {
                    type: GraphQLList(GraphQLNonNull(GraphQLNumber))
                },
                y: {
                    type: GraphQLList(GraphQLNonNull(GraphQLNumber))
                },
                highestDegree: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (parent, args) => {
                try {
                    const regressioneq = new PolyRegression(args.x, args.y, args.highestDegree)
                    return regressioneq.getRegression()
                } catch (error) {
                    return error
                }
            }
        },
        getStats: {
            type: StatsType,
            description: "Get statistical information from given values",
            args: {
                values: {
                    type: GraphQLNonNull(GraphQLList(GraphQLNumber))
                }
            },
            resolve: (parent, args) => {
                try {
                    const stats = new Stats(args.values)
                    return stats.getStats()
                } catch (error) {
                    return error
                }
            }
        }
    })
})

module.exports = {
    RootQueryType,
}