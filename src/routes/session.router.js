import { Router } from "express";
import { usersManager } from "../daos/mongoDB/usersManagerDB.js";
import { hashData, compareData } from "../utils.js";
import { generateToken } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/signup",(req, res, next)=>{ passport.authenticate("signup", {
        successRedirect: '/api/views/login',
        failureRedirect: '/api/views/error'
        })(req, res, next)
    });

router.post('/login', (req, res, next) => {
        passport.authenticate("login", (err, user) => {
            console.log("user", user, req.user, req.cookies.token);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/api/views/signup'); 
            }
            const payload = {
                sub: user._id, 
                name: user.name,
                mail : user.email,
                role: user.role,
            };
            const token = generateToken(payload);
            res.cookie('token', token, { maxAge: 60000, httpOnly: true });
            return res.redirect('/api/views/home');
        })(req, res, next);
    });





router.get("/auth/github", passport.authenticate("github", { 
    scope: ["user:email"] })
);

router.get("/callback", passport.authenticate("github"), (req, res) => {
    console.log(req.user);
    const payload = {
        sub: req.user._id, 
        name: req.user.name,
        mail : req.user.email,
        role: req.user.role,
    };
    const token = generateToken(payload);
    res.cookie('token', token, { maxAge: 60000, httpOnly: true });
    res.redirect("/api/views/home");
});


router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/api/views/error" }),
    (req, res) => {
        console.log(req.user);
        const payload = {
            sub: req.user._id, 
            name: req.user.name,
            mail : req.user.email,
            role: req.user.role,
        };
        const token = generateToken(payload);
        res.cookie('token', token, { maxAge: 60000, httpOnly: true });

        res.redirect("/api/views/home");
    }
);

router.get("/signout", (req, res) => {
    res.clearCookie('token');
    res.redirect("/api/views/login");
});


router.post("/restaurar", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {

            return res.redirect("/api/session/signup");
        }
        const hashedPassword = await hashData(password);
        user.password = hashedPassword;
        await user.save();
        
        res.redirect("/api/views/login")
        } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/current', passport.authenticate('current', {session: false}), async(req, res) => {
    res.status(200).json({message: 'User logged', user: req.user})  
})

export default router;