const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
} = require('graphql')
const {
    QuadraticType,
    PolyRegType,
    StatsType,
    DatasetType,
    PercentileType,
    PointsType,
    CubicType,
    TriangleType,
    DatasetOrderInputType,
    PointsGraphsType,
} = require('./gql-types')
const {
    QuadraticEquation,
    PolyRegression,
    Stats,
    GenerateDataset,
    Percentile,
    GeneratePoints,
    CubicEquation,
    Triangle
} = require('../query-functions/export-classes')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        solveQuadratic: {
            type: QuadraticType, // Return Type
            description: "Solve a quadratic equation that is in the form y = ax^2 + bx + c.",
            args: {
                y: {
                    type: new GraphQLNonNull(GraphQLFloat), // Arg Types
                    defaultValue: 0
                },
                a: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                b: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                c: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                }
            },
            resolve: async (parent, args) => { // Resolver
                try {
                    const quadratic = new QuadraticEquation(args.y, args.a, args.b, args.c)
                    return quadratic.solveEquation()
                } catch (error) {
                    return error
                }
            }
        },
        solveCubic: {
            type: CubicType,
            description: "Solve a cubic equation that is in the form y = ax^3 + bx^2 + cx + d.",
            args: {
                y: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                a: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                b: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                c: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                },
                d: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0
                }
            },
            resolve: async (parent, args) => {
                try {
                    const cubic = new CubicEquation(args.y, args.a, args.b, args.c, args.d)
                    return cubic.solveEquation()
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
                    type: new GraphQLList(new GraphQLNonNull(GraphQLFloat))
                },
                y: {
                    type: new GraphQLList(new GraphQLNonNull(GraphQLFloat))
                },
                highestDegree: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (parent, args) => {
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
                    type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))
                }
            },
            resolve: async (parent, args) => {
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
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: "This represents the maximum of the randomly generated numbers"
                },
                min: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: "This represents the minimum of the randomly generated numbers"
                },
                length: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: "This represents the length of the array of the randomly generated numbers"
                },
                float: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: 'This represents a boolean which says whether to include numbers of type "float" in the dataset',
                    defaultValue: true
                },
                precision: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'If args.float is set to "true", then this field will be valid. It represents the number of significant digits to round the values in the array to.',
                    defaultValue: 100
                },
                order: {
                    type: new GraphQLNonNull(DatasetOrderInputType),
                    description: 'This represents a value of -1, 0, or 1. 1 means that the order will be ascending, -1 means descending, while 0 leaves the values in a random order',
                    defaultValue: 0
                }
            },
            resolve: async (parent, args, request) => {
                try {
                    const dataset = new GenerateDataset(args.min, args.max, args.length, args.float, args.precision, args.order)
                    return dataset.generate()
                } catch (error) {
                    return error
                }
            }
        },
        getPercentile: {
            type: PercentileType,
            description: "Get the percentage of data within a given range of values",
            args: {
                min: {
                    type: GraphQLFloat,
                    description: "If only a minimum value is provided, this will find the percentage of people above the minimum value"
                },
                max: {
                    type: GraphQLFloat,
                    description: "If only a maximum value is provided, this will find the percentage of people below the maximum value"
                },
                sd: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: "This value is required to calculate the percentage"
                },
                mean: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: "This value is required to calculate the percentage"
                }
            },
            resolve: async (parent, args) => {
                try {
                    const percentage = new Percentile(args.min, args.max, args.sd, args.mean)
                    return percentage.getPercentile()
                } catch (error) {
                    return error
                }
            }
        },
        generatePoints: {
            type: PointsType,
            description: "Get two arrays of values that represent coordinate points that are generated around a given line",
            args: {
                spread: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0,
                    description: 'This represents the spread, or the relative distance the points will be from the line.'
                },
                minX: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    defaultValue: 0,
                    description: 'This represents the minimum x value a point can have'
                },
                maxX: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: 'This represents the maximum x value a point can have'
                },
                length: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'This represents the number of points that will be generated'
                },
                graphType: {
                    type: new GraphQLNonNull(PointsGraphsType),
                    description: 'This represents the type of graph the points will be generated around. (ex: polynomial, log, logistic, sin, cos, etc.)',
                    defaultValue: 'polynomial'
                },
                equation: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))),
                    description: 'This represents an equation of any power given in an array of coefficients in ascending order of power or as coefficients that are a part of an equation like y = a*log_b(cx + d) + e. These coefficients will be turned into the graphtype provided in the field "graphType". If graphType is not provided, the default is a polynomial'
                }
            },
            resolve: async (parent, args) => {
                try {
                    const points = new GeneratePoints(args.minX, args.maxX, args.length, args.spread, args.equation, args.graphType)
                    return points.getPoints()
                } catch (error) {
                    return error
                }
            }
        },
        solveTriangle: {
            type: TriangleType,
            description: "Solve a triangle by giving a minimum of 3 sides or angles (you could do 1 side, 2 angles, 2 sides 2 angles, etc.)",
            args: {
                sides: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
                    description: 'This represents the sides given as an array'
                },
                angles: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
                    description: 'This represents the angles given as an array'
                },
            },
            resolve: async (parent, args) => {
                try {
                    const triangle = new Triangle(args.sides, args.angles)
                    return triangle.solveTriangle()
                } catch (error) {
                    return error
                }
            }
        },
    })
})

module.exports = {
    RootQueryType,
}