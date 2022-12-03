import { faker } from "@faker-js/faker";
import Purchase from "../entities/Purchase";
import PurchaseItem from "../entities/PurchaseItem";
import { Factory } from "@vantezzen/typeorm-seeding";

export type PurchaseItemFactoryOptions = { purchase: Purchase };

export default class PurchaseItemFactory extends Factory<
  PurchaseItem,
  PurchaseItemFactoryOptions
> {
  getEntity() {
    return PurchaseItem;
  }

  getFactoryData(options: PurchaseItemFactoryOptions) {
    return {
      purchase: options.purchase,
      totalPrice: faker.commerce.price(),
    };
  }
}
