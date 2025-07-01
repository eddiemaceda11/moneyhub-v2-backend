const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3010, (req, res) => {
  console.log('Server running on 3010');
});
