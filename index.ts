import express from "express";
import * as candidatesController from "./src/controllers/candidates-controller";
import {
  validatorBody,
  validatorQuery,
} from "./src/helpers/validator-middleware";
import {
  skillsSchema,
  newCandidateSchema,
} from "./src/schemas/candidates-schema";
const app = express();
app.use(express.json());
const PORT = process.env.HTTP_PORT || 3000;

// Your code starts here. Placeholders for .get and .post are provided for your convenience.

app.get(
  "",
  validatorQuery(skillsSchema),
  candidatesController.getSkilledCandidate
);

app.post(
  "",
  validatorBody(newCandidateSchema),
  candidatesController.createNewCandidate
);

app.listen(PORT).on("listening", () => {
  console.info("Listening on port", PORT);
});

export default app;
