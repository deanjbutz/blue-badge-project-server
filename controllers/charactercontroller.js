const { CharacterModel } = require('../models');
const validateJWT = require('../middleware/validate-jwt')
const router = require("express").Router();

router.get('/practice', (req, res) => {
    res.send('Hey! This is a practice route!')
})

router.post('/', validateJWT, (req, res) => {
    const {
        race,

    } = req.body;
    

})

module.exports = router;