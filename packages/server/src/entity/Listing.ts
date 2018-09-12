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

  @Column("int")
  upvotes: number;

  @Column("int")
  downvotes: number;

  @Column("text", { array: true })
  amenities: string[];

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.listings)
  user: User;
}
