"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resources_route_1 = __importDefault(require("./public/routes/resources.route"));
// Create the express app
const app = (0, express_1.default)();
app.use("/resources", resources_route_1.default);
const server = app.listen(4321, () => {
    console.log('App is running at http://localhost:4321');
});
server.on('error', (err) => {
    console.error('Server failed to start:', err);
});
