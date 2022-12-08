const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`dist`));

app.listen(process.env.PORT || PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`);
});
