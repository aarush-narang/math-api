const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql')
const {
    QuadraticType,
    GraphQLNumber,
    PolyRegType,
    StatsType,
    DatasetType,
} = require('./gql-types')
const {
    QuadraticEquation,
    PolyRegression,
    Stats
} = require('../query-functions/export-classes')
const { GenerateDataset } = require('../query-functions/generateDataset')

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
        },
        generateDataset: {
            type: DatasetType,
            description: "Get a randomly generated dataset within a given range of numbers with a certain length",
            args: {
                max: {
                    type: GraphQLNonNull(GraphQLNumber),
                    description: "This represents the maximum of the randomly generated numbers"
                },
                min: {
                    type: GraphQLNonNull(GraphQLNumber),
                    description: "This represents the minimum of the randomly generated numbers"
                },
                length: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: "This represents the length of the array of the randomly generated numbers"
                },
                float: {
                    type: GraphQLNonNull(GraphQLBoolean),
                    description: 'This represents a boolean which says whether to include numbers of type "float" in the dataset',
                    defaultValue: true
                },
                precision: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: 'If args.float is set to "true", then this field will be valid. It represents the number of significant digits to round the values in the array to.',
                    defaultValue: 100
                }
            },
            resolve: (parent, args) => {
                try {
                    const dataset = new GenerateDataset(args.min, args.max, args.length, args.float, args.precision)
                    return dataset.generate()
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