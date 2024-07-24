const express = 	require('express');
const router = express.Router();

router.get('/users',(req,res) => {
  const userData = [
    {
      "id":1,
      "name":"Colin"
    }
  ]

  res.send(userData);
})

module.exports = router;