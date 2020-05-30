const express = require("express");
const router = express.Router();
const Workplace = require("../models/Workplace");

router.get("/", async (req, res) => {
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
    const { name, description } = req.body;
    const workplace = new Workplace({
      name,
      description,
      author: req.user._id,
    });
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
    const workplace = await Workplace.findById(workplaceId);
    const isAdmin = workplace.isAdmin(req.user);

    if (isAdmin) {
      workplace.name = req.body.name;
      const updatedWorkplace = await workplace.save();
      return res.status(200).json({ updatedWorkplace });
    }

    res.status(403).json({
      error: true,
      message: "no access",
    });
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

    const workplace = await Workplace.findById(workplaceId);
    const isAdmin = workplace.isAdmin(req.user);

    if (isAdmin) {
      workplace.remove();
      const deletedWorkplace = await workplace.save();
      console.log(deletedWorkplace);
    }

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
