const express = require("express");
const router = express.Router();
const CareRequest = require("../models/careRequest.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Post /api/care-requests - create a new care request
router.post("/care-requests", isAuthenticated, (req, res, next) => {
  const { startDate, endDate, pet, comment, selectedSitter } = req.body;
  const creator = req.payload._id;

  //validation check for required fields
  if (!startDate || !endDate || !pet || !selectedSitter) {
    return res.status(400).json({ error: "Please fill out all required fields" });
  }

  CareRequest.create({ startDate, endDate, pet, creator, comment, selectedSitter })
    .then((newCareRequest) => res.status(201).json({ data: newCareRequest }))
    .catch((error) => res.status(500).json({ error: "Failed to create a new care request", details: error }));
});


// GET /api/care-requests - read all care requests
router.get("/care-requests", (req, res) => {
  const userId = req.payload._id; // Suponiendo que tienes el usuario autenticado

  // Filtering by role
  const filter = req.payload.role === "owner"
    ? { creator: userId }  // Requests created by owner
    : { selectedSitter: userId }; // Requests asigned to a sitter

  CareRequest.find(filter)
    .populate({
      path: "pet",
      select: "name typeOfAnimal pet_picture",
      populate: {
        path: "owner",
        select: "name location",
      },
    })
    .then((careRequests) => res.status(200).json({ data: careRequests }))
    .catch((error) => res.status(500).json({ error: "Failed to fetch care requests", details: error }));
});

// GET /api/care-requests/:requestId - individual care request by id
router.get("/care-requests/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const userId = req.payload._id; // Extract user ID from the authenticated token

  CareRequest.findById(id)
    .populate("pet", "name typeOfAnimal owner pet_picture specialCares description")
    .then((careRequest) => {
      if (!careRequest) {
        return res.status(404).json({ error: "Care request not found" });
      }

      // Ensure the current user is the creator of the care request
      if (careRequest.creator.toString() !== userId && careRequest.selectedSitter.toString() !==userId) {
        return res.status(403).json({ error: "Unauthorized access to care request" });
      }

      res.status(200).json({ data: careRequest });
    })
    .catch((error) => res.status(500).json({ error: "Failed to fetch care request", details: error }));
});


// PUT /api/care-requests/:requestId update care request by id
router.put("/care-requests/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedDetails = req.body;

  CareRequest.findByIdAndUpdate(id, updatedDetails, { new: true })
    .populate("pet") // Populate pet details
    .then((updatedCareRequest) => {
      if (!updatedCareRequest) {
        return res.status(404).json({ error: "Failed to update care request by id" })
      }
      res.status(200).json({ data: updatedCareRequest });
    })
    .catch((error) => res.status(500).json({ error: "Failed to update individual care request" }));
});

// DELETE /api/care-requests/:requestId delete care request by id
router.delete("/care-requests/:id", (req, res, next) => {
  const { id } = req.params;

  CareRequest.findByIdAndDelete(id)
    .then((deletedCareRequest) => {
      if (!deletedCareRequest) {
        return res.status(404).json({ error: "Failed to find individual care request" });
      }
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete care request" });
    });
});

module.exports = router;