import { DataSource } from "typeorm/browser";
import Purchase from "./entities/Purchase";
import PurchaseItem from "./entities/PurchaseItem";

// Normal TypeORM database connection
export default class Database {
  private dataSource: DataSource;
  private isSetup = false;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqljs",
      entities: [Purchase, PurchaseItem],
      synchronize: true,
    });
  }

  async setup() {
    if (this.isSetup) {
      return;
    }

    await this.dataSource.initialize();
    this.isSetup = true;
  }
}
