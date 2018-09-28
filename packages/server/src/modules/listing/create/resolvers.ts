import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { processUpload } from "../shared/processUpload";
import { listingCacheKey } from "../../../constants";
import * as getTime from "date-fns/get_time";
// import { isAuthenticated } from "../../shared/isAuthenticated";

// house.png
// aseq2-house.png
// image/png
// image/jpeg
// ['image', 'jpeg']
// 'jpeg'

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (
      _,
      { input: { picture, ...data } },
      { session, redis }
    ) => {
      // isAuthenticated(session);
      const pictureUrl = picture ? await processUpload(picture) : null;

      const listing = await Listing.create({
        ...data,
        datePosted: String(getTime(new Date())),
        pictureUrl,
        userId: session.userId
      }).save();

      redis.lpush(listingCacheKey, JSON.stringify(listing));

      return true;
    }
  }
};
