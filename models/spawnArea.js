var mongoose = require('mongoose');

var SpawnAreaSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('spawnArea', SpawnAreaSchema);
