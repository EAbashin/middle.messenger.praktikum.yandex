const express = require('express');

const app = express();
const PORT = 3000;

<<<<<<< HEAD
app.use(express.static(`dist`));
=======
app.use(express.static(`${__dirname}/`));
>>>>>>> sprint_1

app.listen(process.env.PORT || PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`);
});
