const FootballSchema = require('../models/Football');

const getData = (req, res, next) => {
  FootballSchema.find({}).sort([['points', -1]]).exec((err, result) => {
    let response = {
      success: false,
      message: '',
      table: []
    }
    
    if (err) {
      response.message = err
      res.send(response)
    } else {
      response.success = true;
      response.message = 'success retrieve data';
      result.map((item, index) => {
        response.table.push({
          clubname: item.clubname,
          points: item.points,
          standing: index + 1
        })
        return item
      })
      res.json(response);
    }
  })
}

const recordGame = (req, res, next) => {
  const { clubhomename, clubawayname, score } = req.body;

  let splitScore = score.split(':');
  let scoreHome = parseInt(splitScore[0].trim());
  let scoreAway = parseInt(splitScore[1].trim());

  let pointHome = 0;
  let pointAway = 0;

  if (scoreHome > scoreAway) {
    pointHome += 3;
  } else if (scoreHome < scoreAway) {
    pointAway += 3;
  } else {
    pointAway += 1;
    pointHome += 1;
  }
  FootballSchema.findOne({clubname: clubhomename}, (err, result) => {
    if (err) throw err;
    FootballSchema.findOneAndUpdate({clubname: clubhomename}, {$set:{points: (parseInt(result.points) + pointHome)}}, {new: true}, (err, docHome) => {
      if (err) throw err;

      FootballSchema.findOne({clubname: clubawayname}, (err, resultAway) => {
        if (err) throw err;
        FootballSchema.findOneAndUpdate({clubname: clubawayname}, {$set:{points: (parseInt(resultAway.points) + pointAway)}}, {new: true}, (err, docAway) => {
          if (err) throw err;
          res.json({data: [docHome, docAway]})
        })
      })
    })
  })
}

listClub = (req, res, next) => {
  let response = {
    status: "ok",
    listTeam: []
  }

  FootballSchema.find({}).sort([["clubname", 1]]).exec((err, result) => {
    if (err) throw err;

    result.map(item => {
      response.listTeam.push(item.clubname);
      return item
    })

    res.json(response)
  })
}

getRank = (req, res, next) => {
  const { clubname } = req.query
  let response = {
    clubname: '',
    standing: '',
    points: ''
  }

  FootballSchema.find({}).sort([['points', -1]]).exec((err, result) => {
    result.map((item, index) => {
      if (item.clubname == clubname) {
        response.clubname = item.clubname,
        response.standing = index + 1,
        response.points = item.points
      }
      return item
    })

    res.json(response)
  })
}

module.exports = {
  getData,
  recordGame,
  listClub,
  getRank
}