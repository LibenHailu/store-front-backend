import { OrderStore } from "../order";
import { UserStore } from "../user";
import { ProductStore } from "../product";

const store = new OrderStore();
describe("Order model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
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

  describe("CRUD Order methods", () => {
    const user = new UserStore();
    const product = new ProductStore();

    beforeAll(async () => {
      await user.create({
        firstname: "john",
        lastname: "doe",
        email: "john@email.com",
        password: "john",
      });
      await product.create({
        name: "car",
        price: 2000,
        category: "luxury",
      });
    });
    afterAll(async () => {
      await user.delete("1");
      await product.delete("1");
    });

    it("create method should add an order", async () => {
      const result = await store.create({
        status: "open",
        user_id: 1,
      });
      expect(result).toEqual({
        id: 1,
        status: "open",
        user_id: 1,
      });
    });

    it("Show method should return the order with it's id", async () => {
      const result = await store.show("1");
      expect(result).toEqual({
        id: 1,
        status: "open",
        user_id: 1,
      });
    });

    it("index method should return a list of orders", async () => {
      const result = await store.index();
      expect(result).toEqual([
        {
          id: 1,
          status: "open",
          user_id: 1,
        },
      ]);

    });

    it("delete method should remove an order", async () => {
      await store.delete("1");
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
