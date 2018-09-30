import { ResolverMap } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { commentCacheKey } from "../../../constants";
import * as getTime from "date-fns/get_time";

export const resolvers: ResolverMap = {
  Mutation: {
    createComment: async (_, { input: { ...data } }, { session, redis }) => {
      const comment = await Comment.create({
        ...data,
        datePosted: String(getTime(new Date())),
        userId: session.userId
      }).save();

      redis.lpush(commentCacheKey, JSON.stringify(comment));

      return true;
    }
  }
};
