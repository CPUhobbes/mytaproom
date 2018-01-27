const express = require("express");
const Index = require("../controllers/");

const Router = express.Router();
/*
 * --- Index Route ---
 */
Router.get("/", Index.loadIndex);

/*
 * --- API Routes ---
 */

module.exports = Router;
