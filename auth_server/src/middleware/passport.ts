import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getRepository } from "typeorm";
import jwtConfig from "../configurations/jwt.js";
import User from "../models/user";
import { to } from "../services/Util";

module.exports = function (passport: any) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.encryption
      },
      async function (jwtPayload: any, done: any) {
        let err;
        let user;
        const userRepository = await getRepository(User);
        [err, user] = await to(userRepository.findOne(jwtPayload.id));
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
