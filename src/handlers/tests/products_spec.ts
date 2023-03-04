import supertest from "supertest";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";
import app from "../../server";

const request = supertest(app);
describe("Test products endpoint responses", () => {
  let token: string;
  beforeAll(() => {
    spyOn(UserStore.prototype, "authenticate").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@gmail.com",
        password: "pass",
      })
    );
    spyOn(ProductStore.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "car",
        price: 2000,
        url: "image.com",
        category: "luxury",
        description: "luxury",
      })
    );
    spyOn(ProductStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: "car",
          price: 2000,
          url: "image.com",
          category: "luxury",
          description: "luxury",
        },
      ])
    );
    spyOn(ProductStore.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "car",
        price: 2000,
        url: "image.com",
        category: "luxury",
        description: "luxury",
      })
    );
    spyOn(ProductStore.prototype, "delete").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "car",
        price: 2000,
        url: "image.com",
        category: "luxury",
        description: "luxury",
      })
    );
  });

  it("should authenticate user", (done) => {
    request
      .post("/users/signin")
      .send({
        email: "john@gmail.com",
        password: "john",
      })
      .then((res) => {
        const { body, status } = res;
        token = body;
        expect(status).toBe(200);
        done();
      });
  });

  it("should create a product", async (done) => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "car",
      price: 2000,
      url: "image.com",
      category: "luxury",
    });
    done();
  });

  it("should get all products", async (done) => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: "car",
        price: 2000,
        url: "image.com",
        category: "luxury",
      },
    ]);
    done();
  });

  it("should get product by id", async (done) => {
    const res = await request.get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "car",
      price: 2000,
      url: "image.com",
      category: "luxury",
    });
    done();
  });

  it("delets a product api endpoint", async (done) => {
    const res = await request
      .delete("/products/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "car",
      price: 2000,
      url: "image.com",
      category: "luxury",
    });
    done();
  });
});
