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
  
  it(" /acl", async () => {
    const response = await mockRequest.post("/api/v2/signup").send({
      username: "marawn3",
      password: "1234",
      role: "editor"
    });
    let token = response.body.token;

    const response2 = await mockRequest
      .post("/api/v2/acl")
      .set("Authorization", "Bearer " + token);
    const response3 = await mockRequest
      .get("/api/v2/acl")
      .set("Authorization", "Bearer " + token);
    const response4 = await mockRequest
      .put("/api/v2/acl")
      .set("Authorization", "Bearer " + token);
    const response5 = await mockRequest
      .delete("/api/v2/acl")
      .set("Authorization", "Bearer " + token);

    // expect(response2.status).toBe(200);

    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
    expect(response4.status).toBe(200);
    expect(response5.status).toBe(500); //becuase he an editoe so he can't delete
  });
});
