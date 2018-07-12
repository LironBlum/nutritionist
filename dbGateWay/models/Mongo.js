`use strict`;
const mongoose = require(`mongoose`);

mongoose.Promise = global.Promise;

const mongoDb = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;

const options = { useMongoClient: true };
if (process.env.MONGO_REPLICASET) {
  options.replicaSet = process.env.MONGO_REPLICASET;
}

let instance = null;

class MongoDB {
  constructor() {
    if (!instance) {
      instance = this;
      this.mongoose = mongoose;
    }
    return instance;
  }

  init() {
    if (this.mongoose.connection.readyState) {
      return Promise.resolve(`connected`);
    }
    this.mongoose.connection.on(`error`, err => {

    });
    return this.connectToDB();
  }

  connectToDB() {
    return this.mongoose.connect(mongoDb, options);
  }

  reconnect() {
    this.mongoose.connection.readyState = 0;
    return this.disconnect()
      .then(() => this.connectToDB())
      .then(() => this.mongoose.connection.readyState);
  }

  disconnect() {
    return this.mongoose.disconnect();
  }
}

module.exports = MongoDB;
