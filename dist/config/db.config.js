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
exports.connectDB = void 0;
const { MONGODB_URL } = process.env;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = () => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, rejects) => {
                mongoose_1.default.connect(`${MONGODB_URL}`, error => {
                    if (error) {
                        rejects(error);
                    }
                    else {
                        resolve("Connect successfully to database!");
                    }
                });
            });
        });
        const resolve = yield promise();
        console.log(resolve);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.connectDB = connectDB;
