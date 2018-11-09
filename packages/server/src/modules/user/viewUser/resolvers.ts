import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    viewUser: async (_, { username }) => {
      return User.findOne({
        where: {
          username
        }
      });
    }
  }
};
