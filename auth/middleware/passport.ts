import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import { getRepository } from "typeorm";
import jwtConfig from "../configurations/jwt.js";
import User from "../models/user";

module.exports = function (passport: any) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.encryption
      },
      async function (jwtPayload: any, done: any) {
        const err = false;
        const userRepository = await getRepository(User);
        const user = await userRepository.findOne(jwtPayload.id);
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
