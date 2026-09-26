const request = require("supertest");
const app = require("../index");

describe("Product API", () => {
  it("should return backend working message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Backend is Working....");
  });

  it("should return products array", async () => {
    const res = await request(app).get("/api/product/list");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
  });
});
