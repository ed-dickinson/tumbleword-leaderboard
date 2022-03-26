var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const scores = [
  {score:000, words:0, name:''},
  {score:000, words:0, name:''},
  {score:000, words:0, name:''}
]

const scoreSchema = new mongoose.Schema({
  score: Number,
  words: Number,
  name: String,
})

const Score = mongoose.model('Score', scoreSchema)



/* GET home page. */
router.get('/scores', function(req, res, next) {
  // res.render('index', { title: 'Express' , scores});
  // res.json( { scores});
  // res.send('/public/index.html')

  Score.find().exec(
    function(err, scores) {
      if (err) {return next(err)}
      if (scores===null) {
        let err = new Error('No scores found.')
        err.status = 404;
        return next(err)
      }
      return res.json({total:scores.length, scores})
    }
  )
});

router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' })
  // return res.status(200).json({post:'post'})
  // res.sendStatus(200)
  let form_object = req.body

  const score = new Score({
    name: form_object.name,
    score: form_object.score,
    words: form_object.words
  })

  score.save(err => {
    if (err) {
      return res.status(400).json(err)
    }
    return res.status(200).json({success:'success', input:form_object})
  })

  // res.json({input: form_object})
})

module.exports = router;
