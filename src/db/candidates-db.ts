import { Candidate } from "../types/candidate"; // estamos estableciendo el tipo de formato que tendra
import { saveToDatabase } from "./utils";
import { randomUUID } from "node:crypto";
const DB = require("./db.json");

export const getAll = (): Candidate[] => {
  return DB.candidates;
};

export const createNew = (newCandidate: Candidate): Candidate => {
  const isAlreadyAdded = DB.candidates.find(
    ({ name }: Candidate) => name === newCandidate.name
  );
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `The candidate with the name '${newCandidate.name}' already exist`,
    };
  }

  try {
    const candidate = {
      id: randomUUID(),
      ...newCandidate,
    }
    DB.candidates.push(candidate);
    saveToDatabase(DB);
    return candidate;
  } catch (error) {
    const err = error as Error;
    throw { status: 500, message: err?.message || err };
  }
};
