import { MongoClient } from 'mongodb';

const uri = 'mongodb://AdminRadu:wNZNL3wpJRSXvaMs@94.130.183.18:27017/';
const MongoDbName = 'soccerSpm';

const MongoConnection = new MongoClient(uri, {
  useNewUrlParser: true,
  UseUnifiedTopology: true,
});

await MongoConnection.connect();

export { MongoConnection, MongoDbName };
