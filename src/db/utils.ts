import fs from "fs";
import { Candidate } from "../types/candidate";
export interface DB {
  candidates: Candidate[];
}

export const saveToDatabase = (db: DB) => {
  fs.writeFileSync("./src/db/db.json", JSON.stringify(db, null, 2), {
    encoding: "utf-8",
  });
};
