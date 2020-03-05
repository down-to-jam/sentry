import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Crypts } from '../crypt/Crypt.js';

/** Define a Mongo collection to hold the data. */
const Accounts = new Mongo.Collection('Accounts');

/** Define a schema to specify the structure of each document in the collection. */
const AccountSchema = new SimpleSchema({
  first: String,
  last: String,
  email: String,
  password: String,
  passwords: [Crypts], /* Every Account has an array of Crypts (passwords) */
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Accounts.attachSchema(AccountSchema);

/** Make the collection and schema available to other code. */
export { Accounts, AccountSchema };