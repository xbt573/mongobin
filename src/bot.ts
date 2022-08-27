import { Paste } from './models/Paste';
import { splitCommand } from './helpers/splitCommand';

import { Bot, Context } from 'grammy';
import mongoose from 'mongoose';

export class PasteBot {
    private _bot: Bot;

    constructor(botToken: string, databaseUrl: string) {
        this._connectDb(databaseUrl).catch((err) => {
            throw err;
        });

        this._bot = new Bot(botToken);
        this._bot.command('start', this._startCommand);
        this._bot.command('help', this._helpCommand);
        this._bot.command('paste', this._pasteCommand);
        this._bot.command('get', this._getCommand);

        this._bot.start();
    }

    private async _connectDb(databaseUrl: string): Promise<void> {
        await mongoose.connect(databaseUrl);
    }

    private async _startCommand(ctx: Context): Promise<void> {
        /** @todo */
        await ctx.reply('start message');
    }

    private async _helpCommand(ctx: Context): Promise<void> {
        /** @todo */
        await ctx.reply('help message');
    }

    private async _pasteCommand(ctx: Context): Promise<void> {
        let text: string;
        if (ctx!.message!.reply_to_message) {
            text = ctx!.message!.reply_to_message!.text!;
        } else {
            text = splitCommand(ctx!.message!.text!);
        }

        if (!text) {
            await ctx.reply('ID is not specified');
            return;
        }

        const paste = await Paste.create({ text });

        await ctx.reply(paste._id.toString());
    }

    private async _getCommand(ctx: Context): Promise<void> {
        const id = splitCommand(ctx!.message!.text!);

        if (!id) {
            await ctx.reply('ID is not specified');
            return;
        }

        if (!mongoose.isValidObjectId(id)) {
            await ctx.reply('ID is not valid');
            return;
        }

        const paste = await Paste.findById(id);
        if (!paste) {
            await ctx.reply('Paste not found');
            return;
        }

        await ctx.reply(paste.text);
    }
}
