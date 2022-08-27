import mongoose from 'mongoose';
import { IPaste } from '../interfaces/IPaste';

const pasteSchema = new mongoose.Schema<IPaste>({
    text: String,
    document: String
}, {
    versionKey: false,
});

const Paste = mongoose.model<IPaste>('paste', pasteSchema);
export { Paste };
