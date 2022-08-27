"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paste = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pasteSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
}, {
    versionKey: false,
});
const Paste = mongoose_1.default.model('paste', pasteSchema);
exports.Paste = Paste;
