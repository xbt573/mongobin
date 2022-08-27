import { PasteBot } from './bot';
import config from 'config';

const token: string = config.get<string>('botToken');
const databaseUrl: string = config.get<string>('databaseUrl');

const bot: PasteBot = new PasteBot(token, databaseUrl);
