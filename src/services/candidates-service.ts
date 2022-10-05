import * as candidatesdb from "../db/candidates-db";
import { Candidate } from "../types/candidate";

export const getSkilledCandidate = (skills: string[]): Candidate => {
  const allcandidates = candidatesdb.getAll();
  let skilledCandidate;
  let skillsCounter = 0;
  for (const candidate of allcandidates) {
    let currentSkillsCounter = 0;
    for (const skill of skills) {
      if (candidate.skills.includes(skill)) {
        currentSkillsCounter++;
        if (currentSkillsCounter > skillsCounter) {
          skillsCounter = currentSkillsCounter;
          skilledCandidate = candidate;
        }
      }
    }
  }
  if (!skilledCandidate)
    throw {
      status: 404,
      message: "A skilled candidate has not been found",
    };
  return skilledCandidate;
};

export const createNewCandidate = (newCandidate: Candidate): Candidate => {
  try {
    const createdCandidate = candidatesdb.createNew(newCandidate);
    return createdCandidate;
  } catch (error) {
    throw error;
  }
};
