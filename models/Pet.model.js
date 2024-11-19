const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeOfAnimal: {
        type: String,
        enum: ['Dog', 'Cat'],
        required: true
    },
    breed: String,
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
    specialCares: String,
    pet_picture: String //URL

})

module.exports = model("Pet", petSchema);