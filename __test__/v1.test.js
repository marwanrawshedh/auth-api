"use strict";

const { server } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(server);
const { db } = require("../src/models/index");

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
});

// after all the tests are done
afterAll(async () => {
  await db.drop();
});

describe("Web server", () => {

  // test if can create a food

  it("can add a food", async () => {
    const response = await mockRequest.post("/api/v1/food").send({
        name: "orange",
        calories: 1,
        type:'fruit'
      
    });

    expect(response.status).toBe(201);
  });

  // test if can read

  it(" GET /api/v1/:model returns a list of :model items", async () => {
    const response = await mockRequest.get("/api/v1/food");

    expect(response.status).toBe(200);
  });

  // test if can read one of food
    it("GET /api/v1/:model/ID returns a single item by ID", async () => {

      const response = await mockRequest.get("/api/v1/food/1");

      expect(response.status).toBe(200);
    });

    

    // test if can update food
    it(" PUT /api/v1/:model/ID returns a single, updated item by ID", async () => {
      const response = await mockRequest.put("/api/v1/food/1").send({
        name: "apple",
        calories: 1,
        type:'fruit'
      });
  
      expect(response.status).toBe(200);
    });
    // test if can delete food
    it("DELETE /api/v1/:model/ID returns an empty object.", async () => {
      const response = await mockRequest.delete("/api/v1/food/1");

      expect(response.status).toBe(200);
    });

    it("can add a sport", async () => {
      const response = await mockRequest.post("/api/v1/clothes").send({
        name: "T-shirt",
        color: "black",
        size:"larg"
      });
      

      expect(response.status).toBe(201);
    });

    // test if can read

    it(" GET /api/v1/:model returns a list of :model items", async () => {
      const response = await mockRequest.get("/api/v1/clothes");

      expect(response.status).toBe(200);
    });

    // test if can read one of food
    it("GET /api/v1/:model/ID returns a single item by ID", async () => {
      const response = await mockRequest.get("/api/v1/clothes/1");

      expect(response.status).toBe(200);
    });

    // test if can update food
    it(" PUT /api/v1/:model/ID returns a single, updated item by ID", async () => {
      const response = await mockRequest.put("/api/v1/clothes/1").send({
        name: "shirt",
        color: "black",
        size:"larg"
    });

    expect(response.status).toBe(200)
    });
    // test if can delete food
    it("DELETE /api/v1/:model/ID returns an empty object.", async () => {
      const response = await mockRequest.delete("/api/v1/clothes/1");

      expect(response.status).toBe(200);
      
    });
});

