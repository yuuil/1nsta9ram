import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username,
          },
          { email },
        ],
      });
      if (exists) {
        throw Error("This username / email is alerady taken");
      }
      try {
        await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio,
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
