import * as passportJWT from "passport-jwt";
import jwtConfig from "../configurations/jwt.js";

module.exports = function (passport: any) {
  passport.use(
    new passport.JwtStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.encryption
      },
      async function (jwtPayload: any, done: any) {
        let err;
        let user;
        // TODO : get user
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
