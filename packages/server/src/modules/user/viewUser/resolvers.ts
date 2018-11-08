import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    user: async (_, { username }) => {
      return User.findOne({
        where: {
          username
        }
      });
    }
  }
};
