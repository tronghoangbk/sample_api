import { Request, Response } from "express";
import Joke from "../models/joke.model";

const gẹtJokeController = async (req: Request, res: Response) => {
  const joke = await Joke.aggregate([{ $sample: { size: 1 } }]);
  const seenJokes = req.cookies.seenJokes || [];
  const unseenJokes = await Joke.find({ _id: { $nin: seenJokes } });

  if (unseenJokes.length === 0) {
    res.send({
      message: "That's all the jokes for today! Come back another day!",
    });
  } else {
    const nextJoke =
      unseenJokes[Math.floor(Math.random() * unseenJokes.length)];
    res.cookie("seenJokes", seenJokes.concat(nextJoke._id), {
      httpOnly: true,
      maxAge: 86400000, // 1 day
      domain: "simple-project-123.netlify.app",
      path: "/", 
      sameSite: "none",
      secure: true,
    });
    res.send(nextJoke);
  }
};

const likeJokeController = async (req: Request, res: Response) => {
  const joke = await Joke.findById(req.params.id);
  if (!joke) {
    res.status(404).send({ message: "Joke not found" });
  } else {
    joke.likes += 1;
    await joke.save();
    res.send(joke);
  }
};

const dislikeJokeController = async (req: Request, res: Response) => {
  const joke = await Joke.findById(req.params.id);
  if (!joke) {
    res.status(404).send({ message: "Joke not found" });
  } else {
    joke.dislikes += 1;
    await joke.save();
    res.send(joke);
  }
};

const createJokeController = async (req: Request, res: Response) => {
  try {
    const joke = new Joke({
      text: req.body.text,
    });
    await joke.save();
    res.send(joke);
  } catch (error) {
    res.status(400).send({ message: "Joke not created" });
  }
};

export {
  gẹtJokeController,
  likeJokeController,
  dislikeJokeController,
  createJokeController,
};
