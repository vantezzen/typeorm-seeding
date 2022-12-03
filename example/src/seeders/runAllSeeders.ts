import PurchaseSeeder from "./PurchaseSeeder";
import { runSeeders } from "@vantezzen/typeorm-seeding";

const runAllSeeders = () => runSeeders([PurchaseSeeder]);
export default runAllSeeders;
