// mongodb.ts
import { MongoClient, Db } from "mongodb";
// import type {Mongo} from "mongodb"

const uri: string = process.env.MONGODB_URI!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
} else {
  if (process.env.NODE_ENV === "development") {
    // Use a global variable to hold the client so that it can be reused
    // across hot reloads in development mode.
    if (!(global as any)._mongoClientPromise) {
      client = new MongoClient(uri);
      (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise;
