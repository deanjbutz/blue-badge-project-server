const {DataTypes} = require("sequelize")
const db = require("../db")

const Character = db.define("character", {
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chrClass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    strength: { //ability scores
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dexterity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    constitution: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    intelligence: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wisdom: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    charisma: { //ability scores end
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    classSkill: { //proficiencies
        type: DataTypes.STRING,
        allowNull: false,
    },
    backgroundTool: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raceLanguage: { //proficiencies end
        type: DataTypes.STRING,
        allowNull: false,
    },
    fightingStyle: { //options
        type: DataTypes.STRING,
        allowNull: false,
    },
    backgroundSpeciality: {// options end
        type: DataTypes.STRING,
        allowNull: false,
    },
    hitPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    knownSpell: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    armor: {//equipment
        type: DataTypes.STRING,
        allowNull: false,
    },
    weapon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tool: {//equipment
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: { //character
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    characterBackstory: {// end character
        type: DataTypes.STRING,
        allowNull: true,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Character