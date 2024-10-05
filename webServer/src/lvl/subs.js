
// main db interface upon the main lvl interface
import {db} from './lvl.js'

// store general infomation about the operation and misc things
export const base = db;

// store info about the  users
export const users = db.db.sublevel('users',{ valueEncoding: 'json' });

// store the misc stuffs
export const misc= db.db.sublevel('misc',{ valueEncoding: 'json' });



