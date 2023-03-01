import express from "express";
import {
  gẹtJokeController,
  likeJokeController,
  dislikeJokeController,
  createJokeController,
} from "../controllers/joke.controller";

const JokeRouter = express.Router();

// JokeRouter.post("/create", createJokeController);

JokeRouter.post("/", gẹtJokeController);

JokeRouter.post("/like/:id", likeJokeController);

JokeRouter.post("/dislike/:id", dislikeJokeController);

export default JokeRouter;
