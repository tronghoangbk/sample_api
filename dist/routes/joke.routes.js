"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joke_controller_1 = require("../controllers/joke.controller");
const JokeRouter = express_1.default.Router();
// JokeRouter.post("/create", createJokeController);
JokeRouter.post("/", joke_controller_1.gẹtJokeController);
JokeRouter.post("/like/:id", joke_controller_1.likeJokeController);
JokeRouter.post("/dislike/:id", joke_controller_1.dislikeJokeController);
exports.default = JokeRouter;
