import passport from "passport";
import { usersManager } from "./dao/users.dao.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy} from "passport-local"
import { hashData, compareData} from "./utils.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import config from "./config.js";

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await usersManager.findById(id)
        done(null,user)
    } catch (error) {
        done(error)
    }
})

passport.use("signup", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, done) => {
    const { first_name, last_name, email, password, rol } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return done(null, false);
    }
    try {
      const hashedPassword = await hashData(password);
      const createdUser = await usersManager.createOne({
        ...req.body,
        password: hashedPassword,
      });
      return done(null, createdUser);
    } catch (error) {
      return done(error);
    }
  }));

passport.use("login", new LocalStrategy({usernameField:"email"}, async(email,password,done)=>{
    if ( !email || !password) {
        done(null,false,{ message: "All fields are required" })
    }
    try {
        const user = await usersManager.findByEmail(email)
        if (!user){
            return done(null, false, { message: "Incorrect email or password." })
        }
        
        //const isPasswordValid = password === user.password
        const isPasswordValid = await compareData(password, user.password)
        if(!isPasswordValid){
            return done(null, false, { message: "Incorrect email or password." })
        }
        //const products = await productsManager.findAll({limit:10, page:1, sort:{}, query:{} })
        //const docs = products.payload.docs
        //res.render("products",{products: docs,user:user.firstName});
        done(null, user);
    } catch (error) {
        console.log(error)
        done(error)
    }
}))

passport.use("github", new GithubStrategy({
    clientID:"Iv1.c748f46a6f06769d",
    clientSecret: "d51347c54a2e0b3aa2b025ef296957770757c3b3",
    callbackURL:"http://localhost:8088/api/sessions/callback"
}, async(accessToke, refreshToken, profile, done) => {
    try{
        const userDB = await usersManager.findByEmail(profile._json.email)
        if(userDB){
            if(userDB.isGithub){
                return done(null,userDB)
            } else{
                return done(null,false)
            }
        }
        const infoUser = {
            firstName:profile._json.name.split(" ")[0],
            lastName:profile._json.name.split(" ")[1],
            email:"default@gmail.com",
            password:" ",
            isGithub: true
        }
        const createdUser = await usersManager.createOne(infoUser)
        done(null,createdUser)
    }catch(error){
        done(error)
    }
}))

const fromCookies = (req) => {
    return req.cookies.token;
  };
  
passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
        secretOrKey: config.secret_jwt,
      },
      (jwt_payload, done) => {
        done(null, jwt_payload);
      }
    )
);