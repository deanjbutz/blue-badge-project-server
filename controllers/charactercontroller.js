const { CharacterModel } = require('../models');
const validateJWT = require('../middleware/validate-jwt')
const router = require("express").Router();

router.get('/practice', (req, res) => {
    res.send('Hey! This is a practice route!')
})

router.post('/', validateJWT, async (req, res) => {
    const {
        race,
        chrClass,
        background,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        classSkill,
        backgroundTool,
        raceLanguage,
        fightingStyle,
        backgroundSpeciality,
        hitPoints,
        knownSpell,
        armor,
        weapon,
        tool,
        name,
        gender,
        height,
        weight,
        characterBackstory,
        owner_id
    } = req.body; //! might need something else here
    const { id } = req.user; //! might need to adjust this
    const characterEntry = {
        race,
        chrClass,
        background,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        classSkill,
        backgroundTool,
        raceLanguage,
        fightingStyle,
        backgroundSpeciality,
        hitPoints,
        knownSpell,
        armor,
        weapon,
        tool,
        name,
        gender,
        height,
        weight,
        characterBackstory,
        owner_id
    };
    try {
        const newCharacter = await CharacterModel.create(characterEntry);
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(500).json({ message: `Failed to create character. Error: ${err}`})
    }
});

router.put('/:id', validateJWT, async (req, res) => {
    const {
        race,
        chrClass,
        background,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        classSkill,
        backgroundTool,
        raceLanguage,
        fightingStyle,
        backgroundSpeciality,
        hitPoints,
        knownSpell,
        armor,
        weapon,
        tool,
        name,
        gender,
        height,
        weight,
        characterBackstory,
        owner_id
    } = req.body;
    const { id } = req.params;
    // const owner_id = req.user.id; //! wtf are dataValues?

    const query = {
        where: {
            id: id,
            owner_id: owner_id
        }
    };

    const updatedCharacter = {
        race,
        chrClass,
        background,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        classSkill,
        backgroundTool,
        raceLanguage,
        fightingStyle,
        backgroundSpeciality,
        hitPoints,
        knownSpell,
        armor,
        weapon,
        tool,
        name,
        gender,
        height,
        weight,
        characterBackstory,
    };

    try {
        const update = await CharacterModel.update(updatedCharacter, query);

        if (update > 0) {
            res.status(202).json({ message: `Character update successful!`, character: updatedCharacter})
        } else {
            res.status(500).json({ message: `Character update failed`})
        }

    } catch (err) {
        res.status(500).json({ message: `Failed to update character. Error: ${err}`})
    }
});

router.get('/', async (req, res) => {
    try {
        const characters = await CharacterModel.findAll();
        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({ message: `Failed to get characters. Error: ${err}`})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await CharacterModel.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: `Character found`, results: results})
    } catch (err) {
        res.status(500).json({ message: `Failed to get character. Error: ${err}`})
    }
})

router.delete('/:id', validateJWT, async (req, res) => {
    const owner_id = req.body.user.id;
    const { id } = req.params;
    try {
        const query = {
            where: {
                id: id,
                owner_id: owner_id
            }
        };
        const result = await CharacterModel.destroy(query);
        if (result) {
            res.status(200).json({ message: 'Character Deleted'});
        } else {
            res.status(400).json({ message: "character not found"})
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete character. Error: ${err}`})
    }
})

module.exports = router;