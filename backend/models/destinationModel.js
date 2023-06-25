

const mongoose = require("mongoose")

const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        requied: [ true, "Please add a name"],
        trim: true
    },
    country: {
        type: String,
        requied: [ true, "Please add a country"],
        trim: true
    },
    image:{
        type: Object,
        default: {},
    },
    things_to_do: {
        type: String
    },
    description: {
        type: String,
        requied: true,
        default: "desc"
    }

},
{
    timestamps: true,        //retine momentrul creeri si ultimei updatari
});


const Destination = mongoose.model("Destination", destinationSchema)
module.exports = Destination