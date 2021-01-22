const request = require('supertest');
const app = require('fastify')({ logger: true });

app.get('/user', function(_, res) {
	res.status(200).send({ name: 'john' });
});

console.log(app.ready())

request(app.server)
	.get('/user')
	.then(res => {
		console.info(res.body);
	});
