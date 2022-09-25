const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    dob:{
        type: Date,
        required:true
    },
    gender:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const maxSize = 5 * 1024 * 1024 // 5MB

// static function
userSchema.statics.uploadedAvatar = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
        //   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            req.flash('error', 'Only .png, .jpg and .jpeg format allowed!');
            return
        }
      },
}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;