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
exports.PasteBot = void 0;
const Paste_1 = require("./models/Paste");
const splitCommand_1 = require("./helpers/splitCommand");
const grammy_1 = require("grammy");
const mongoose_1 = __importDefault(require("mongoose"));
class PasteBot {
    constructor(botToken, databaseUrl) {
        this._connectDb(databaseUrl).catch((err) => {
            throw err;
        });
        this._bot = new grammy_1.Bot(botToken);
        this._bot.command('start', this._startCommand);
        this._bot.command('help', this._helpCommand);
        this._bot.command('paste', this._pasteCommand);
        this._bot.command('get', this._getCommand);
        this._bot.start();
    }
    _connectDb(databaseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(databaseUrl);
        });
    }
    _startCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @todo */
            yield ctx.reply('start message');
        });
    }
    _helpCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @todo */
            yield ctx.reply('help message');
        });
    }
    _pasteCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let text;
            if (ctx.message.reply_to_message) {
                text = ctx.message.reply_to_message.text;
            }
            else {
                text = (0, splitCommand_1.splitCommand)(ctx.message.text);
            }
            if (!text) {
                yield ctx.reply('ID is not specified');
                return;
            }
            const paste = yield Paste_1.Paste.create({ text });
            yield ctx.reply(paste._id.toString());
        });
    }
    _getCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, splitCommand_1.splitCommand)(ctx.message.text);
            if (!id) {
                yield ctx.reply('ID is not specified');
                return;
            }
            if (!mongoose_1.default.isValidObjectId(id)) {
                yield ctx.reply('ID is not valid');
                return;
            }
            const paste = yield Paste_1.Paste.findById(id);
            if (!paste) {
                yield ctx.reply('Paste not found');
                return;
            }
            yield ctx.reply(paste.text);
        });
    }
}
exports.PasteBot = PasteBot;
