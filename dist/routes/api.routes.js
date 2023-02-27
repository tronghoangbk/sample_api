"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joke_routes_1 = __importDefault(require("./joke.routes"));
const APIRouter = express_1.default.Router();
APIRouter.use("/joke", joke_routes_1.default);
exports.default = APIRouter;
