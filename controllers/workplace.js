const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/passport");
const Workplace = require("../models/Workplace");

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const workplace = await Workplace.find({ users: userId });

    res.status(200).json({ workplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.get("/:workplaceId/users", async (req, res) => {
  try {
    const { workplaceId } = req.params;
    const { users } = await Workplace.findById(workplaceId);
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.get("/:workplaceId/devices", async (req, res) => {
  try {
    const { workplaceId } = req.params;
    const { devices } = await Workplace.findById(workplaceId);
    res.status(200).json({ devices });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const workplace = new Workplace({ name });
    await workplace.save();

    res.status(201).json({ workplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.patch("/:workplaceId", async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const updatedWorkplace = await Workplace.findByIdAndUpdate(
      workplaceId,
      req.body,
      { new: true }
    );

    res.status(200).json({ updatedWorkplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.delete("/:workplaceId", async (req, res) => {
  try {
    const { workplaceId } = req.params;

    const deletedWorkplace = await Workplace.findByIdAndDelete(workplaceId);

    res.status(200).json({ deletedWorkplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});
module.exports = router;
