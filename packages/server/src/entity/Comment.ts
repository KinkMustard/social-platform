import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Listing } from "./Listing";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  text: string;

  @Column("varchar", { length: 20 })
  datePosted: string;

  @Column("int", { default: 0 })
  upvotes: number;

  @Column("int", { default: 0 })
  downvotes: number;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column("uuid")
  listingId: string;

  @ManyToOne(() => Listing)
  listing: Listing;
}
