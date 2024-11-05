const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const UserModel = require("../model/usermodel");

const PassportConfig = (app) => {
    // Google Strategy Configuration
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ googleId: profile.id });
            if (!user) {
                // Create a new user if not found
                user = new UserModel({
                    firstname: profile.given_name,
                    lastname: profile.family_name,
                    gender:'not specified',
                    email: profile.email,
                    password:'nothing',
                    googleId: profile.id,
                    recommendation:[]
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Serialize user to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    // Initialize Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = PassportConfig;
