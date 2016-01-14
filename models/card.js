var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  catalog: { type: String },
  cardNumber: { type: String },
  strain: { type: String },
  rarity: { type: String, required: true },
  spawnArea: { type: String },
  image: { type: String },
  stats: {
    healthMin: { type: Number },
    healthMax: { type: Number },
    psycheMin: { type: Number },
    psycheMax: { type: Number },
    attackMin: { type: Number },
    attackMax: { type: Number },
    defenseMin: { type: Number },
    defenseMax: { type: Number },
    speedMin: { type: Number },
    speedMax: { type: Number },
    intelligenceMin: { type: Number },
    intelligenceMax: { type: Number },
  },
  skillset: {
    level01: { type: String },
    level15: { type: String },
    level30: { type: String },
    level40: { type: String },
    level50: { type: String },
    redeath: { type: String }
  }
});

module.exports = mongoose.model('card', cardSchema);
