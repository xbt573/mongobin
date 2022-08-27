"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const config_1 = __importDefault(require("config"));
const token = config_1.default.get('botToken');
const databaseUrl = config_1.default.get('databaseUrl');
const bot = new bot_1.PasteBot(token, databaseUrl);
