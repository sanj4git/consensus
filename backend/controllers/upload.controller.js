const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { PYTHON_EMBEDDING_URL } = require("../utils/pythonService");
const Chunk = require("../models/Chunk");

exports.uploadSyllabus = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(req.file.path)
    );

    const response = await axios.post(
      PYTHON_EMBEDDING_URL,
      formData,
      { headers: formData.getHeaders() }
    );

    const chunks = response.data.chunks;

    if (!chunks || chunks.length === 0) {
      return res.status(400).json({ message: "No chunks returned from Python" });
    }

    // OPTIONAL: clear old chunks for this project
    await Chunk.deleteMany({ projectId });

    // Store chunks in MongoDB
    const docs = chunks.map(chunk => ({
      projectId,
      text: chunk.text,
      embedding: chunk.embedding
    }));

    await Chunk.insertMany(docs);

    res.json({
      message: "Syllabus processed and stored successfully",
      chunkCount: docs.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process syllabus" });
  }
};
