const {
	MongoClient
} = require('mongodb');


const MONGO_URI = process.env.MONGO_DB_URI
const mongoClient = new MongoClient(MONGO_URI);

// start authorization (401 - what) and authentication (403 - who)
const db = mongoClient.db('API')
const apiKeysCollection = db.collection('API KEYS');

(async function () {
	await mongoClient.connect()
})();

const authentication = async (request, response, next) => {
	const apiKey = request.get('X-API-Key') || request.query.apiKey // find api key in the headers or query parameters
	if (!apiKey) return response.status(403).send('<h1>Forbidden</h1></br>Please enter an API Key either in the headers or query parameters.') // if there is no key in either
	
	const document = await apiKeysCollection.findOne({ apiKey }) // search in db
    
	if (!document) return response.status(403).send('<h1>Forbidden</h1></br>API Key invalid.')
	// maybe add banned apis check here too and add a banned/suspended apis collection?
	
	request.permissions = document.permissions // append permissions from document to the request so it can be accessed in the root schema

	return next()
};

// document schema: { email: 'abcd@gmail.com', password: 'hashed password + salt + pepper', apiKey: 'api key (hashed with pepper)', permissions: [String(query names that are allowed for this user)]}

module.exports = {
    authentication,
}