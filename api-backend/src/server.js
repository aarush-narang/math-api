const express = require('express')
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const { RootMutationType, RootQueryType } = require('./graphql/gql-roots')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(
	{
		origin: 'http://localhost:3000',
		methods: '',
		credentials: true,
	},
));

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))



app.listen(3001, () => console.log(`Server Running on Port 3001`))