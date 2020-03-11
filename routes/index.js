const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  /* POST Record Game */
  router.post('/recordgame', (req, res) => {
    const {
      clubhomename,
      clubawayname,
      score
    } = req.body;
    let result = []
    let scores = score.split(':');
    let homeScores = parseInt(scores[0].trim());
    let awayScores = parseInt(scores[1].trim());
    let homePoints = 0;
    let awayPoints = 0;

    if (homeScores > awayScores) {
      homePoints = 3;
    } else if (homeScores < awayScores) {
      awayPoints = 3;
    } else {
      awayPoints = 1;
      homePoints = 1;
    }

    result.push({
      clubname: clubhomename,
      points: homePoints
    }, {
      clubname: clubawayname,
      points: awayPoints
    })

    let sqlShowHomeClub = `SELECT * FROM record WHERE clubname='${clubhomename}'`
    let sqlShowAwayClub = `SELECT * FROM record WHERE clubname='${clubawayname}'`

    pool.query(sqlShowHomeClub, (err, dataHome) => {
      if (err) res.send(err)
      let pointHomeResult = (dataHome.rows.length > 0 ? dataHome.rows[0].points : 0) + homePoints;
      if (dataHome.rows.length == 0) {
        let sqlAddHome = `INSERT INTO record(clubname, points, createdat) VALUES('${clubhomename}', ${pointHomeResult}, now())`;
        console.log(sqlAddHome)
        pool.query(sqlAddHome, err => {
          if (err) res.status(500).json(err)
          pool.query(sqlShowAwayClub, (err, dataAway) => {
            if (err) res.send(err)
            let pointAwayResult = (dataAway.rows.length > 0 ? dataAway.rows[0].points : 0) + awayPoints;
            if (dataAway.rows.length == 0) {
              let sqlAddAway = `INSERT INTO record(clubname, points, createdat) VALUES('${clubawayname}', ${pointAwayResult}, now())`;
              console.log(sqlAddAway)
              pool.query(sqlAddAway, err => {
                if (err) res.send(err)
                res.json(result);
              })
            } else {
              let sqlUpdatePointAwayClub = `UPDATE record SET points=${pointAwayResult} WHERE clubname='${clubawayname}'`
              console.log(sqlUpdatePointAwayClub)
              pool.query(sqlUpdatePointAwayClub, err => {
                if (err) res.send(err)
                res.json(result);
              })
            }
          })
        })
      } else {
        let sqlUpdatePointHomeClub = `UPDATE record SET points=${pointHomeResult} WHERE clubname='${clubhomename}'`
        console.log(sqlUpdatePointHomeClub)
        pool.query(sqlUpdatePointHomeClub, (err) => {
          if (err) res.send(err)
          pool.query(sqlShowAwayClub, (err, dataAway) => {
            if (err) res.send(err)
            let pointAwayResult = (dataAway.rows.length > 0 ? dataAway.rows[0].points : 0) + awayPoints;
            if (dataAway.rows.length == 0) {
              let sqlAddAway = `INSERT INTO record(clubname, points, createdat) VALUES('${clubawayname}', ${pointAwayResult}, now())`;
              console.log(sqlAddAway)
              pool.query(sqlAddAway, err => {
                if (err) res.send(err)
                res.json(result);
              })
            } else {
              let sqlUpdatePointAwayClub = `UPDATE record SET points=${pointAwayResult} WHERE clubname='${clubawayname}'`
              console.log(sqlUpdatePointAwayClub)
              pool.query(sqlUpdatePointAwayClub, err => {
                if (err) res.send(err)
                res.json(result);
              })
            }
          })
        })
      }
    })
  })

  /* GET League Standing */
  router.get('/leaguestanding', function (req, res, next) {
    let sqlGet = `SELECT * FROM record ORDER BY points DESC`
    pool.query(sqlGet, (err, data) => {

      if (err) res.send(err)
      let result = []
      data.rows.forEach(item => {
        result.push({
          clubname: item.clubname,
          points: item.points
        })
      })
      res.json({
        result
      });
    })
  });

  /* GET Rank Club */
  router.get('/rank', (req, res) => {
    let clubname = req.query.clubname;
    console.log(clubname)
    let sqlShowAll = `SELECT * FROM record ORDER BY points DESC`
    pool.query(sqlShowAll, (err, data) => {
      let result = []
      let addStanding = data.rows.map((item, index) => {
        item.standing = index + 1
        return item
      });

      addStanding.forEach(item => {
        if (item.clubname == clubname) {
          result.push({
            clubname: item.clubname,
            points: item.points,
            standing: item.standing
          })
        }
      })

      res.json(result)
    })
  })

  return router
};