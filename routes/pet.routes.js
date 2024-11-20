const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Pet = require("../models/Pet.model");

// POST /pets - Creates a new pet
router.post("/api/pets", (req, res, next) => {
  const {
    name,
    typeOfAnimal,
    breed,
    owner,
    age,
    description,
    specialCares,
    pet_picture,
  } = req.body;

  Pet.create({
    name,
    typeOfAnimal,
    breed,
    owner,
    age,
    description,
    specialCares,
    pet_picture,
  })
    .then((newPet) => res.json(newPet))
    .catch((err) => res.json(err));
});

// GET /pets - Retrieve all of the pets
router.get("/api/pets", (req, res, next) => {
  Pet.find()
    // -> Populate User???
    .then((allPets) => res.status(200).json({ data: allPets }))
    .catch((err) =>
      res.status(500).json({ error: "Failed to fetch pets", err })
    );
});

// GET /pets/:petId - Retrieve a specific pet by id
router.get("/api/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Pet.findById(petId)
    //  -> Populate User????
    .then((pet) => {
      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }
      res.status(200).json({ data: pet });
    })
    .catch((err) => res.json({error: "Failed to fetch pet by id", err}));
});

module.exports = router;
