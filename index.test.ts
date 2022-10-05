import app from "./index";
import supertest from "supertest";
import { saveToDatabase } from "./src/db/utils";
import { writeFile } from "node:fs/promises";

jest.setTimeout(20000);
const data = {
  candidates: [
    {
      id: "0facd8d3-4361-4ab7-8921-3d57a73b796a",
      name: "Diana Lenz",
      skills: ["scala", "golang"],
    },
    {
      id: "cedc66c9-b955-49e1-ae68-7e69a102bee9",
      name: "Victor Garcia De Lugo",
      skills: ["JavaScript", "TypeScript", "Blockchain"],
    },
    {
      id: "f116bf73-dd79-47d8-9d3a-c59460b10106",
      name: "Luiss Lugo",
      skills: ["JavaScript", "TypeScript"],
    },
  ],
};
// beforeEach((done) => {
//   writeFile("./src/db/db.json", JSON.stringify(data, null, 2), {
//     encoding: "utf-8",
//   });
//});
jest.mock("./src/db/db.json", () => ({
  candidates: [
    {
      id: "0facd8d3-4361-4ab7-8921-3d57a73b796a",
      name: "Diana Lenz",
      skills: ["scala", "golang"],
    },
    {
      id: "cedc66c9-b955-49e1-ae68-7e69a102bee9",
      name: "Victor Garcia De Lugo",
      skills: ["JavaScript", "TypeScript", "Blockchain"],
    },
    {
      id: "f116bf73-dd79-47d8-9d3a-c59460b10106",
      name: "Luiss Lugo",
      skills: ["JavaScript", "TypeScript"],
    },
  ],
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe("GET /", () => {
  test("should return a skilled candidate", async () => {
    await supertest(app)
      .get("/")
      .query({
        skills: ["Blockchain"],
      })
      .expect(200)
      .then((response) => {
        // Check data
        expect(response.body.data.id).toBe(data.candidates[1].id);
        expect(response.body.data.name).toBe(data.candidates[1].name);
        expect(response.body.data.skills).toStrictEqual(
          data.candidates[1].skills
        );
      });
  });

  test("should NOT return any skilled candidate", async () => {
    await supertest(app)
      .get("/")
      .query({
        skills: ["Python"],
      })
      .expect(404)
      .then((response) => {
        // Check data
        expect(response.body.data.error).toBe(
          "A skilled candidate has not been found"
        );
        expect(response.body.status).toBe("FAILED");
      });
  });

  test("should NOT return any skilled candidate when no skills were provided", async () => {
    await supertest(app)
      .get("/")
      .expect(400)
      .then((response) => {
        // Check data
        expect(response.body.error).toBe('"skills" is required');
      });
  });
});

describe("POST /", () => {
  test("should add a new candidate", async () => {
    await supertest(app)
      .post("/")
      .send({
        name: "Nallely Lugo",
        skills: ["Go", "PHP"],
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        // Check data
        expect(response.body.status).toBe("OK");
        expect(response.body.data.id).toBeTruthy();
        expect(response.body.data.name).toBe("Nallely Lugo");
        expect(response.body.data.skills).toStrictEqual(["Go", "PHP"]);
      });
  });

  test("should throw an error if candidate is duplicated", async () => {
    await supertest(app)
      .post("/")
      .send({
        name: "Nallely Lugo",
        skills: ["Go", "PHP"],
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        // Check data
        expect(response.body.data.error).toBe(
          "The candidate with the name 'Nallely Lugo' already exist"
        );
        expect(response.body.status).toBe("FAILED");
      });
  });

  test("should throw an error if candidate is duplicated", async () => {
    await supertest(app)
      .post("/")
      .send({
        skills: ["Go", "PHP"],
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        // Check data
        expect(response.body.error).toBe('"name" is required');
      });
  });
});
