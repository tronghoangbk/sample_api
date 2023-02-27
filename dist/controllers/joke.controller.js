"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJokeController = exports.dislikeJokeController = exports.likeJokeController = exports.gẹtJokeController = void 0;
const joke_model_1 = __importDefault(require("../models/joke.model"));
const gẹtJokeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const joke = yield joke_model_1.default.aggregate([{ $sample: { size: 1 } }]);
    const seenJokes = req.cookies.seenJokes || [];
    const unseenJokes = yield joke_model_1.default.find({ _id: { $nin: seenJokes } });
    if (unseenJokes.length === 0) {
        res.send({
            message: "That's all the jokes for today! Come back another day!",
        });
    }
    else {
        const nextJoke = unseenJokes[Math.floor(Math.random() * unseenJokes.length)];
        res.cookie("seenJokes", seenJokes.concat(nextJoke._id), {
            httpOnly: true,
            maxAge: 86400000,
            domain: ".simple-project-123.netlify.app",
        });
        res.send(nextJoke);
    }
});
exports.gẹtJokeController = gẹtJokeController;
const likeJokeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const joke = yield joke_model_1.default.findById(req.params.id);
    if (!joke) {
        res.status(404).send({ message: "Joke not found" });
    }
    else {
        joke.likes += 1;
        yield joke.save();
        res.send(joke);
    }
});
exports.likeJokeController = likeJokeController;
const dislikeJokeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const joke = yield joke_model_1.default.findById(req.params.id);
    if (!joke) {
        res.status(404).send({ message: "Joke not found" });
    }
    else {
        joke.dislikes += 1;
        yield joke.save();
        res.send(joke);
    }
});
exports.dislikeJokeController = dislikeJokeController;
const createJokeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const joke = new joke_model_1.default({
            text: req.body.text,
        });
        yield joke.save();
        res.send(joke);
    }
    catch (error) {
        res.status(400).send({ message: "Joke not created" });
    }
});
exports.createJokeController = createJokeController;
