const {
	MongoClient
} = require('mongodb');

const MONGO_URI = process.env.MONGO_DB_URI
const mongoClient = new MongoClient(MONGO_URI);

const db = mongoClient.db('API')
const collection = db.collection('API KEYS');

(async function () {
	await mongoClient.connect()
})();

const authentication = async (req, res, next) => {
	const apiKey = req.get('X-API-Key') || req.query.apiKey // find api key in the headers or query parameters
	if (!apiKey) return res.status(401).send('<h1>Unauthorized</h1></br>Please enter an API Key either in the headers or query parameters.') // if there is no key in either
	
	const document = await collection.findOne({ apiKey }) // search in db

	if (!document) return res.status(401).send('<h1>Unauthorized</h1></br>API Key invalid.')
	if (document.suspended) return res.status(403).send('<h1>Forbidden</h1></br>API Key suspended.')
	
	const lastClear = document.lastClear
	if (Date.now() - 2629800000 > lastClear) await collection.updateOne({ apiKey }, { $set: { lastClear: Date.now(), requests: 0 }})

	req.permissions = document.permissions // append permissions from document to the request so it can be accessed in the root schema
	req.userinfo = { collection, apiKey }

	return next()
};


module.exports = {
    authentication,
}