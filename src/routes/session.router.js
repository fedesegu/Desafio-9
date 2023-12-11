import { Router } from "express";
import { sessionControler } from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.post("/signup", sessionControler.signup);
router.post("/login", sessionControler.login);
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/callback", passport.authenticate("github", { failureRedirect: "/error" }), sessionControler.callback);
router.get("/signout", sessionControler.signout);
router.post("/restore", sessionControler.restore);

export default router;