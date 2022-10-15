var express = require('express');
var router = express.Router();
require('../models/connection');
const Place = require('../models/places')

// POST /places : ajout d’un marqueur en base de données (via req.body)
router.post('/', (req, res) => {
    console.log('__',req.body)
    Place.findOne({nickname: req.body.nickname, name: req.body.name})
    .then(dbData => {
        if(dbData === null) {
            const newPlace = new Place ({
                nickname: req.body.nickname,
                name: req.body.name,
                latitude: req.body.latitude, 
                longitude: req.body.longitude,
            })
            newPlace.save().then(
                res.json({result: true})
        )
        } else {
            res.json({result: false, error: 'Place already exists'})
        }
    })
})

//GET /places/:nickname : récupération de tous les marqueurs 
//d’un utilisateur en fonction de son surnom (via req.params)

router.get('/:nickname', (req, res) => {
    Place.find({nickname:  req.params.nickname}, {_id:0, name: 1, nickname: 1, latitude: 1, longitude:1})
    .then(dbData => {
        console.log(dbData)
        if(dbData === null ){
            res.json({result: true, places :'User not found or no places registered'})
        } else {
            res.json({result: true, places: dbData})
        }
     })
})

//DELETE /places : suppression d’un marqueur à partir de son nom et
// du surnom de l’utilisateur (via req.body)

router.delete('/', (req, res) => {
    Place.deleteOne({name: req.body.name, nickname: req.body.nickname}).then(dbData => {
        if (!dbData){
            res.json({result: false, error: 'Place not found'})
        } else {
            res.json({result: true})
        }

    })
})

module.exports = router;
