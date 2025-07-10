import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js"; // Uncomment if you want to use controller functions
import { onboard } from "../controllers/auth.controller.js"; // Uncomment if you want to use controller functions
import { protectRoute } from "../middlewares/auth.middleware.js"; // Uncomment if you want to use


const router = express.Router();

router.post("/signup", signup ); // Uncomment if you want to use controller functions

router.post("/login", login ); // Uncomment if you want to use controller functions

router.post("/logout", logout ); // Uncomment if you want to use controller functions

router.post("/onboarding", protectRoute, onboard);

// check if user is logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;