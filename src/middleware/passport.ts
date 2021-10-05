import { Strategy, ExtractJwt } from 'passport-jwt';
import { model } from 'mongoose';

import { jwtEnvironment } from '../environments/jwt.environment';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtEnvironment.SECRET_JWT
}

export const PassportFunction =  (passport): void => {
    passport.use(new Strategy(options, async (payload, done): Promise<void> => {
    try {
      const user = await model('users').findOne(payload.usedID).select('email id');
      if (user) {
          done(null, user);
      } else {
          done(null, false)
      }
    } catch (err) {
        console.error(err)
    }
  }));
}



