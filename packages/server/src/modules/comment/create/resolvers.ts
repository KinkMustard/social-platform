import { ResolverMap } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { commentCacheKey } from "../../../constants";
import * as getTime from "date-fns/get_time";

export const resolvers: ResolverMap = {
  Mutation: {
    createComment: async (_, { comment }, { session, redis }) => {
      const dbComment = await Comment.create({
        ...comment,
        datePosted: String(getTime(new Date())),
        userId: session.userId
      }).save();

      redis.lpush(commentCacheKey, JSON.stringify(dbComment));

      return true;
    }
  }
};
