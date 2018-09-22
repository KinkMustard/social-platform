import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { getConnection } from "typeorm";
import { listingCacheKey } from "../../../constants";
// import { isAuthenticated } from "../../shared/isAuthenticated";
import { User } from "../../../entity/User";

// house.png
// aseq2-house.png
// image/png
// image/jpeg
// ['image', 'jpeg']
// 'jpeg'

export const resolvers: ResolverMap = {
  Mutation: {
    upvoteListing: async (
      _,
      { listingId, upvotes, userId, upvoted },
      { redis }
    ) => {
      // isAuthenticated(session);
      // 1. user uploads a new picture

      // 2. user remove picture
      // 3. do nothing

      const {
        raw: [newListing]
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set({ upvotes })
        .where("id = :id", { id: listingId })
        .returning("*")
        .execute();

      const listings = await redis.lrange(listingCacheKey, 0, -1);
      const idx = listings.findIndex(
        (x: string) => JSON.parse(x).id === listingId
      );
      await redis.lset(listingCacheKey, idx, JSON.stringify(newListing));

      const temp = upvoted;
      temp.push(listingId);

      const updateUserPromise = User.update(
        { id: userId },
        {
          upvoted: temp
        }
      );

      await Promise.all([updateUserPromise]);

      return true;
    }
  }
};
