import passport, { type Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  type VerifyCallback,
} from "passport-google-oauth2";
import { User, type IUserDocument } from "../models/user_model";
import type { Request } from "express";

const baseUrl = import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${baseUrl}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) {
      try {
        const email: string | undefined = profile.emails?.[0]?.value;
        const googleId: string = profile.id;

        let user = await User.findOne({ googleId });

        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email,
            googleId,
            avatar: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Google OAuth error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(
  (user: IUserDocument, done: (err: any, id?: string) => void) => {
    done(null, user._id.toString());
  }
);

passport.deserializeUser(
  async (id: string, done: (err: any, user?: IUserDocument | null) => void) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
);
