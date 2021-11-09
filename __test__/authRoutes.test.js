const { server } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(server);
const { db } = require("../src/models/index");
beforeAll(async () => {
  await db.sync();
});

// after all the tests are done
afterAll(async () => {
  await db.drop();
});

describe("Web server", () => {
  it("POST to /signup to create a new user", async () => {
    const response = await mockRequest.post("/api/v2/signup").send({
      username: "marawn",
      password: "1234",
      role: "admin"
    });

    expect(response.status).toBe(201);
  });
  it("POST to /signin to login as a user (use basic auth)", async () => {
     const response = await mockRequest.post("/api/v2/signup").send({
      username: "marawn1",
      password: "1234",
      role: "admin"
    });
    const response2 = await mockRequest
    .post("/api/v2/signin")
    .auth("marawn1", "1234");
    
    expect(response.status).toBe(201);
    expect(response2.status).toBe(200);
  });})
  