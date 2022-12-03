import { faker } from "@faker-js/faker";
import Purchase from "../entities/Purchase";
import { Factory } from "@vantezzen/typeorm-seeding";

export default class PurchaseFactory extends Factory<Purchase> {
  getEntity() {
    return Purchase;
  }

  getFactoryData() {
    return {
      shopName: faker.company.name(),
    };
  }
}
