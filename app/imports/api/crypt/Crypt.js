import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Crypts = new Mongo.Collection('Crypts');

/** Define a schema to specify the structure of each document in the collection. */
const CryptSchema = new SimpleSchema({
  owner: String,
  description: String,
  key: String, /* The secret password */
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Crypts.attachSchema(CryptSchema);

/** Make the collection and schema available to other code. */
export { Crypts, CryptSchema };