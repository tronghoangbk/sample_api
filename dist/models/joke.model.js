"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jokeSchema = new mongoose_1.default.Schema({
    text: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});
exports.default = mongoose_1.default.model("Joke", jokeSchema);
