import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm/browser";
import Purchase from "./Purchase";

@Entity("purchase_items")
export default class PurchaseItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items)
  purchase!: Purchase;

  @Column("float")
  totalPrice!: number;
}
