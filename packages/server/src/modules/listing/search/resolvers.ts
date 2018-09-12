import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchListings: async (
      _,
      { input: { name, downvotes, upvotes }, limit, offset }
    ) => {
      let listingQB = getConnection()
        .getRepository(Listing)
        .createQueryBuilder("l");
      if (downvotes) {
        listingQB = listingQB.andWhere("l.downvotes = :downvotes", { downvotes });
      }
      if (upvotes) {
        listingQB = listingQB.andWhere("l.upvotes = :upvotes", { upvotes });
      }
      if (name) {
        listingQB = listingQB.andWhere("l.name ilike :name", {
          name: `%${name}%`
        });
      }

      return listingQB
        .take(limit)
        .skip(offset)
        .getMany();
    }
  }
};
