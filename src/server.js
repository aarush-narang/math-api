require('dotenv').config()
const express = require('express')
const cors = require('cors');
const {
	graphqlHTTP
} = require('express-graphql')
const {
	GraphQLSchema
} = require('graphql')
const {
	RootQueryType
} = require('./graphql/gql-roots')

const PORT = process.env.BACKEND_PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST'],
	credentials: true,
}, ));

const schema = new GraphQLSchema({
	query: RootQueryType,
})
app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true, // Graphical interface for interacting with graphql
}))


app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))