import PurchaseFactory from "../factories/PurchaseFactory";
import PurchaseItemFactory from "../factories/PurchaseItemFactory";
import { Seeder } from "@vantezzen/typorm-seeding";

export default class PurchaseSeeder extends Seeder {
  async run() {
    const purchaseFactory = new PurchaseFactory(10);
    const purchaseItemFactory = new PurchaseItemFactory(10);
    const purchases = await purchaseFactory.create();

    purchases.forEach((purchase) => {
      purchaseItemFactory.create({ purchase });
    });
  }
}
