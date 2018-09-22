import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity("listings")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text", { nullable: true })
  pictureUrl: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("int", { default: 0 })
  upvotes: number;

  @Column("int", { default: 0 })
  downvotes: number;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.listings)
  user: User;
}
