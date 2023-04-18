const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 5000;

const api = require('./routes/api');
app.use('/api/v1', api);

// global error handling
app.use((req, res) => {
    res.status(500).send({ message: 'Something broke!' });
})

// connect to database
const dbo = require('./db/conn');
dbo.connectToServer((err) => {
    if (err) {
        console.error(err);
        process.exit();
    }

    app.listen(port, () => {
        console.log('app listening on port ' + port);
    });
});
