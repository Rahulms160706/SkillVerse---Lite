const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// CREATE new pet
router.post("/", async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    console.log("Pet created:", newPet);
    res.status(201).json(newPet);
  } catch (err) {
    console.error("Error creating pet:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE pet by id
router.put("/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all pets (for reset)
router.delete("/", async (req, res) => {
  try {
    await Pet.deleteMany();
    res.json({ message: "All pets deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
