import { Request, Response } from "express";
import * as candidateService from "../services/candidates-service";

export const getSkilledCandidate = (req: Request, res: Response) => {
  try {
    const { skills } = req.query as { skills: string[] };
    const allCandidates = candidateService.getSkilledCandidate(skills);
    res.send({ status: "OK", data: allCandidates });
  } catch (error) {
    const err = error as Error;
    console.error(err?.message || err);
    res
      .status(err.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || err } });
  }
};

export const createNewCandidate = (req: Request, res: Response) => {
  try {
    const createdCandidate = candidateService.createNewCandidate(req.body);
    res.status(201).send({ status: "OK", data: createdCandidate });
  } catch (error) {
    const err = error as Error;
    console.error(err?.message || err);
    res
      .status(err.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || err } });
  }
};
