"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDatabase = async (cb) => {
    const uri = `mongodb+srv://tanmaysrkr:e9HXXHeZzN5c95EE@cluster0.eucuekw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose_1.default.connect(uri, {
            dbName: "propreturns",
        });
        console.log("You successfully connected to MongoDB!");
        cb && cb();
    }
    catch (error) {
        console.log(`Error while db connection: ${error}`);
    }
};
exports.default = ConnectDatabase;
