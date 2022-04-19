import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.HTTP_PORT || 3000

// Your code starts here. Placeholders for .get and .post are provided for your convenience.

app.post('', function(req, res) {

});

app.get('', function(req, res) {

});

app.listen(PORT).on('listening', () => {
    console.info('Listening on port', PORT)
});