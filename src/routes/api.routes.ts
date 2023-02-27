import express from "express";
import JokeRouter from "./joke.routes";



const APIRouter = express.Router();

APIRouter.use("/joke", JokeRouter);




export default APIRouter;
