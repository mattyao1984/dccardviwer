var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default: 'user'},
  ign: {type: String}
});

userSchema
.virtual('full_name')
.get(function(){
  return this.first_name + ' ' + this.last_name;
});

userSchema.pre('save', function(cb){
  var user = this;

  if(!user.isModifed('password'))
    return cb();

  bcrypt.getSalt(5, function(err, salt){
    if(err)
      return cb(err);

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err)
        return cb(err);

      user.password = hash;
      cb();
    });
  });
});

userSchema.methods.verifyPasword = function(password, cb){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err)
      return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
