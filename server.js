const
    express = require('express'),
    path = require('path'),
    PORT = process.env.PORT || 3000,
    app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
