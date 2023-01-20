import supertest from "supertest";
import { UserStore } from "../../models/user";
import { OrderStore } from "../../models/order";
import app from "../../server";

const request = supertest(app);
describe("Test orders endpoint responses", () => {
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
    spyOn(OrderStore.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        status: "open",
        user_id: 1,
      })
    );
    spyOn(OrderStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          status: "open",
          user_id: 1,
        },
      ])
    );
    spyOn(OrderStore.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        status: "open",
        user_id: 1,
      })
    );
    spyOn(OrderStore.prototype, "delete").and.returnValue(
      Promise.resolve({
        id: 1,
        status: "open",
        user_id: 1,
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

  it("should create a order", async (done) => {
    const res = await request
      .post("/orders")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      status: "open",
      user_id: 1,
    });
    done();
  });

  it("should get all orders", async (done) => {
    const res = await request
      .get("/orders")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        status: "open",
        user_id: 1,
      },
    ]);
    done();
  });

  it("should get order by id", async (done) => {
    const res = await request
      .get("/orders/1")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      status: "open",
      user_id: 1,
    });
    done();
  });

  it("delets a order api endpoint", async (done) => {
    const res = await request
      .delete("/orders/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      status: "open",
      user_id: 1,
    });
    done();
  });
});
