import supertest from "supertest";
import { UserStore } from "../../models/user";
import app from "../../server";

const request = supertest(app);
describe("Test users endpoint responses", () => {
  let token: string;
  beforeAll(() => {
    spyOn(UserStore.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@gmail.com",
        password: "pass",
      })
    );
    spyOn(UserStore.prototype, "delete").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@gmail.com",
        password: "pass",
      })
    );
    spyOn(UserStore.prototype, "create").and.returnValue(
      Promise.resolve({
        firstname: "John",
        lastname: "Doe",
        email: "john@gmail.com",
        password: "pass",
      })
    );
    spyOn(UserStore.prototype, "authenticate").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@gmail.com",
        password: "pass",
      })
    );
  });
  it("should create user", (done) => {
    request
      .post("/users")
      .send({
        firstname: "John",
        lastname: "Doe",
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

  it("shoudl get user the index endpoint", (done) => {
    request
      .get("/users")
      .set("Authorization", "Bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should authenticate user", (done) => {
    request
      .post("/users/signin")
      .send({
        email: "john@gmail.com",
        password: "john",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should the delete user", (done) => {
    request
      .delete("/users")
      .set("Authorization", "Bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
