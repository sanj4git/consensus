// backend/agents/contentArchitect.js

async function runContentArchitect({ model, topChunks, question }) {
    const contentArchitectPrompt = `
  You are a Content Architect for a curriculum-aligned educational AI system.
  
  YOUR PRIMARY RULE:
  You must NEVER mix explicitly stated syllabus content with inferred explanations.
  
  MANDATORY OUTPUT STRUCTURE:
  1. EXPLICITLY STATED IN THE SYLLABUS
  2. INFERRED OR DERIVED FROM THE SYLLABUS CONTEXT
  3. NOT PRESENT IN THE SYLLABUS
  
  RULES:
  - No external knowledge
  - No teaching-style explanations
  - Be analytical, not helpful
  
  If a statement appears verbatim or near-verbatim in the syllabus,
  prefer classifying it as EXPLICIT rather than INFERRED.
  
  
  SYLLABUS:
  ${topChunks.join("\n\n")}
  
  QUESTION:
  ${question}
  `;
  
    const draftResult = await model.generateContent(contentArchitectPrompt);
    return draftResult.response.text();
  }
  
  module.exports = {
    runContentArchitect
  };
  