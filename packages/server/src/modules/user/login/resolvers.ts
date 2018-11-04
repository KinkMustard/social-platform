import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError
} from "./errorMessages";
import { userSessionIdPrefix } from "../../../constants";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, redis, req }
    ) => {
      const user: any = validateEmail(email)
        ? await User.findOne({ where: { email } })
        : await User.findOne({ where: { username: email } });

      if (!user) {
        return { errors: errorResponse };
      }

      if (!user.confirmed) {
        return {
          errors: [
            {
              path: "email",
              message: confirmEmailError
            }
          ]
        };
      }

      if (user.forgotPasswordLocked) {
        return {
          errors: [
            {
              path: "email",
              message: forgotPasswordLockedError
            }
          ]
        };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { errors: errorResponse };
      }

      // login sucessful
      session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      return { sessionId: req.sessionID };
    }
  }
};
