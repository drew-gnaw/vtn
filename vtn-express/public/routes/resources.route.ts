import express from "express";

const resourcesRouter = express.Router();

// GET /resources
resourcesRouter.get("/resources", (req, res) => {
  res.json({ message: "List of resources" });
});

export default resourcesRouter;
