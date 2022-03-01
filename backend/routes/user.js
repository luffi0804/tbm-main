import express from "express";
import user from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import userMidd from "../middlewares/user.js";
import roleMidd from "../middlewares/role.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/register",userMidd.existingUser, roleMidd.getRoleUser, user.registerUser);
router.post("/registerAdminUser", auth, admin, userMidd.existingAdmin, userMidd.existingUser, user.registerAdminUser);
router.post("/login", user.login);

router.get("/listUsers/:name?", auth, admin, user.listUsers);

//router.get("/list/:status?/:name?", auth, admin, user.list);
router.get("/listAllUsers/:name?", auth, admin, user.listAllUser);
router.get("/getRole/:email", auth, user.getUserRole);
router.get("/findUser/:_id", auth, validId, admin, user.findUser);
router.put("/updateUser", auth, admin, user.updateUser);
router.put("/deleteUser/:_id",validId, auth, admin, user.deleteUser);

export default router;
