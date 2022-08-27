"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitCommand = void 0;
function splitCommand(input) {
    if (input.includes('\n')) {
        return input.split('\n').slice(1).join('\n');
    }
    return input.split(' ').slice(1).join(' ');
}
exports.splitCommand = splitCommand;
