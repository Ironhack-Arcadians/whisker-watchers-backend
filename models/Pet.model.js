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
    owner: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, // Link to the User (Pet Owner) 
    },
    age: Number,
    description: String,
    specialCares: String,
    pet_picture: String //URL
})

module.exports = model("Pet", petSchema);