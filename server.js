const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');


app.use(express.static('public'))

app.get('/coindesk', function (req, res) {
  console.log("worked");

  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  })

app.listen(port, () => console.log(`CoinDesk app listening on port ${port}!`))

