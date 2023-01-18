import { UserStore } from "../user";

const store = new UserStore();
describe("User model", () => {
  it("should have authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("should have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create({
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      password: "john",
    });

    expect(result).toBeDefined();
  });

  it("Show method should return the user with it's id", async () => {
    const result = await store.show("2");
    expect(result.email).toEqual("john@gmail.com");
    expect(result.firstname).toEqual("John");
    expect(result.lastname).toEqual("Doe");
  });

  it("update method should update a user", async () => {
    const result = await store.update("2", {
      firstname: "Johnny",
      lastname: "Doe",
      email: "john@gmail.com",
      password: "john",
    });
    expect(result.email).toEqual("john@gmail.com");
    expect(result.firstname).toEqual("Johnny");
    expect(result.lastname).toEqual("Doe");
  });

  it("delete method should remove a user", async () => {
    const result = await store.delete("2");

    expect(result.email).toEqual("john@gmail.com");
  });
});
