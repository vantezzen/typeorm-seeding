import PurchaseSeeder from "./PurchaseSeeder";
import { runSeeders } from "@vantezzen/typorm-seeding";

const runAllSeeders = () => runSeeders([PurchaseSeeder]);
export default runAllSeeders;
