const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Pet = require("../models/Pet.model")


// POST /pets - Creates a new pet
router.post("/pets", (req, res, next) => {
    const { name, typeOfAnimal, breed, owner, age, description, specialCares, pet_picture } = req.body;

    Pet.create({ name, typeOfAnimal, breed, owner, age, description, specialCares, pet_picture })
        .then((newPet) => res.json(newPet))
        .catch((err) => res.json(err));
})

// GET /pets - Retrieve all of the pets
router.get("/pets", (req, res, next) => {
    Pet.find()
        // -> Populate User???
        .then((allPets) => res.json(allPets))
        .catch((err) => res.json(err))
})

// GET /pets/:petId - Retrieve a specific pet by id
router.get("/pets/:petId", (req, res, next) => {
    const { petId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Pet.findById(projectId)
        //  -> Populate User????
        .then((pet) => res.status(200).json(pet))
        .catch((err) => res.json(error));
})

module.exports = router;