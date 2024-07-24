require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const router = require("./routes/routes");

// express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


// middleware
const corOptions = {
  origin: "*",
  Credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corOptions));
app.use('/',router)


// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

const items = [
  {
    name: "laptop",
    price: 500,
  },
  {
    name: 'desktop',
    price:700,
  },
]


app.get('/api/items', (req, res) => {
  res.json({ message: 'This is CORS-enabled for all origins!' });
});