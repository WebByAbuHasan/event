import express from "express";
import {login,register} from "../controllers/authController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {createEvent, deleteEvent, getAllEvents, getEventById, updateEvent} from "../controllers/eventController.js";
import {getEventByCategoryId} from "../controllers/serviceControllers.js";
import {createCategory, getCategories} from "../controllers/CategoryController.js";

const router = express.Router();


// users account api
router.post("/register", register);
router.post("/login", login);
//event api
router.post("/createEvent",authMiddleware , createEvent );
router.get("/getAllEvents", getAllEvents);
router.get("/getEventById/:id", getEventById);
router.put("/updateEvent/:id", authMiddleware , updateEvent);
router.delete("/deleteEvent/:id", authMiddleware , deleteEvent);
router.get("/event/category/:categoryId",getEventByCategoryId);

router.post("/createCategory", authMiddleware , createCategory);
router.get("/getCategories", getCategories);

export default router;