const express = require("express");
const router = express.Router();
const CareRequest = require("../models/careRequest.model");

// Post create a new care request
router.post("/api/care-requests", (req, res, next) => {
    const { startDate, endDate, pet, sitter, comment } = req.body;

    //validation check for required fields
    if(!startDate || !endDate || !pet || !sitter) {
        return res.status(400).json({ error: "Please fill out all required fields" });
    }

    CareRequest.create({ startDate, endDate, pet, sitter, comment })
    .then((newCareRequest) => res.status(201).json({ data: newCareRequest }))
    .catch((error) => res.status(500).json({ error: "Failed to create a new care request", details: error }));
});

// GET read all care requests
router.get("/api/care-requests", (req, res, next) => {
    CareRequest.find()
    .populate("pet") // Populate pet details
    .populate("sitter") // Populate sitter details
    .then((careRequests) => res.status(200).json({ data: careRequests }))
    .catch((error) => res.status(500).json({ error: "Failed to fetch care requests", details: error }));
});

// GET individual care request by id
router.get("/api/care-requests/:id", (req, res, next) => {
    const { id } = req.params;

    CareRequest.findById(id)
    .populate("pet") // Populate pet details
    .populate("sitter") // Populate sitter details
    .then((careRequest) => {
        if (!careRequest) {
            return res.status(404).json({ error: "Failed to find care request by id" });
        }
        res.status(200).json({ data: careRequest });
    })
    .catch((error) => res.status(500).json({ error: "Failed to fetch care request", details: error }));
});

// PUT update care request by id
router.put("/api/care-requests/:id", (req, res, next) => {
    const { id } = req.params;
    const updatedDetails = req.body;

    CareRequest.findByIdAndUpdate(id, updatedDetails, {new: true})
    .populate("pet") // Populate pet details
    .populate("sitter") // Populate sitter details
    .then((updatedCareRequest) => {
        if (!updatedCareRequest) {
            return res.status(404).json({ error: "Failed to update care request by id" })
        }
        res.status(200).json({ data: updatedCareRequest });
    })
    .catch((error) => res.status(500).json({ error: "Failed to update individual care request" }));
});

// DELETE delete care request by id
router.delete("/api/care-requests/:id", (req, res, next) => {
    const { id } = req.params;

    CareRequest.findByIdAndDelete(id)
    .then((deletedCareRequest) => {
        if(!deletedCareRequest) {
            return res.status(404).json({ error: "Failed to find individual care request" });
        }
        res.status(204).send();
    })
    .catch((error) => {
        res.status(500).json({ error: "Failed to delete care request" });
    });
});

module.exports = router;