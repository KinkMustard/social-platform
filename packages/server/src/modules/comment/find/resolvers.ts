import { ResolverMap } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";

export const resolvers: ResolverMap = {
  Comment: {
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    comments: async (_, { listingId }, { session }) => {
      return Comment.find({
        where: {
          listingId,
          userId: session.userId
        }
      });
    }
  }
};
