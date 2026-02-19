const express = require("express");
import resourcesHandler from "./api/resources";
import authHandler from "./api/auth";

const app = express();
app.use(express.json());

// Mount handlers
app.all("/api/resources", (req: any, res: any) => resourcesHandler(req, res));

app.post("/api/auth/login", (req: any, res: any) => authHandler(req, res));

app.listen(3000, () => {
    console.log("Server running → http://localhost:3000/api/resources");
});
