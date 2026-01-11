const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { uploadSyllabus } = require("../controllers/upload.controller");

// Upload syllabus PDF
router.post(
  "/syllabus/:projectId",
  authMiddleware,
  upload.single("file"),
  uploadSyllabus
);

module.exports = router;
