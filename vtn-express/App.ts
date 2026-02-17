const express = require("express");
import resourcesHandler from "./api/resources";

const app = express();
app.use(express.json());

// Mount handlers
app.all("/api/resources", (req: any, res: any) => resourcesHandler(req, res));

app.listen(3000, () => {
    console.log("Server running → http://localhost:3000/api/resources");
});
