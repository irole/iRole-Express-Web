const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate');
const uniqueString = require('unique-string');

const userSchema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isGuest: {type: Boolean, default: false},
    rememberToken: {type: String, default: null},
    admin: {type: Boolean, default: false},
}, {
    timestamps: true,
    toJSON: {
        transform(doc: any, ret: any) {
            delete ret.password;
        }, virtuals: true, versionKey: false
    }
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, {maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, signed: true});
    this.update({rememberToken: token}, (err: any) => {
        if (err) console.log(err);
    });
};

export default mongoose.model('User', userSchema);
