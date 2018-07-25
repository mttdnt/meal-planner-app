const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
});

userSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
      try {
        hash = await bcrypt.hash(user.password, 10)
        user.password = hash;
        next();
      } catch (e) {
        next(e)
      }
    } else {
      return next();
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;