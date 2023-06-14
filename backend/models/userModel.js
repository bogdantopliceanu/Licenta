/*
//cand vrem sa interactionam cu mongo db trebuie sa cream un model, 
//astfel ne structuram datele pe care le stocam in mongodb


const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//scheletul informatii pe care vrem sa o stocam
const userSchema = mongoose.Schema({
    name: {
        type: String,
        requied: [ true, "Please add a name"]
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,  //remove spaces
        tarch: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        requied: [ true, "Please add a password"],
        minLength: [3, "Password too short"],
        //maxLength: [15, "Password too long"]
    },
    photo:{
        type: String,
        required: [true, "Please add an photo"],
        default: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    },
    phone: {
        type: String,
        default: "+40712345678"
    },
    bio: {
        type: String,
        maxLength: [300, "Bio must not be longer than 300 characters"],
        default: "bio"
    }

},
{
    timestamps: true,        //retine momentrul creeri si ultimei updatari
});


//Ecncrypt pass inainte de a o salva in db
//   .pre e pentru a modifica inainte a o salva
userSchema.pre("save", async function(next) {

    //in cazul in care dorim sa modificam orice in afara de parola
    if(!this.isModified("password")){
        return next();
    }

    //hash password
    //salt cu cat e mai mare cu atat e mai complex si sigur hash-ul, dar si dureaza mai mult
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword

    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User
*/











const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const destinationSchema = mongoose.Schema({
  destination: {
    type: String,
    required: [true, "Please add a destination"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating"],
  },
});

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [3, "Password too short"],
      },
      photo: {
        type: String,
        required: [true, "Please add a photo"],
        default:
          "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png",
      },
      phone: {
        type: String,
        default: "+40712345678",
      },
      bio: {
        type: String,
        maxLength: [300, "Bio must not be longer than 300 characters"],
        default: "bio",
      },
      destinations: {
        type: [
          {
            destination: {
              type: String,
              required: [true, "Please add a destination"],
            },
            rating: {
              type: Number,
              min: 1,
              max: 10,
              required: [true, "Please add a rating"],
            },
          },
        ],
        default: [],
      }, // Array of destinations
      admin: {
        type: String,
        default: "false",
      },
    },
    {
      timestamps: true,
    }
  );
  

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
