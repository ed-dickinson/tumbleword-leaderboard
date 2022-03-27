var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')


const scoreSchema = new mongoose.Schema({
  score: Number,
  words: Number,
  name: String,
})

const Score = mongoose.model('Score', scoreSchema)

const max_scores = 10;

/* GET home page. */
router.get('/scores', function(req, res, next) {

  Score.find().sort({'score':-1}).exec(
    function(err, scores) {
      // console.log(scores)
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

router.post('/add_score',function(req, res, next) {

  let form_object = req.body

  const score = new Score({
    name: form_object.name,
    score: form_object.score,
    words: form_object.words
  })

  Score.find().sort({'score':1}).exec(
    function(err, scores) {
      console.log(scores[0], scores.length)
      if (err) {return next(err)}
      if (scores===null) {
        return res.status(400).json({no:'scores yet'})
      }
      if (scores.length > max_scores) {
        Score.findByIdAndRemove(scores[0]._id, function(req, res, next) {
          if (err) { return next(err) }
        })

      }
      score.save(err => {
        if (err) {
          return res.status(400).json(err)
        }

        return res.status(200).json({success:'success', input:form_object})
      })
    }
  )

})

module.exports = router;
