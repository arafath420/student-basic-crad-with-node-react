import express from "express";
import {
  createStudent,
  getAllStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// create route
router.route("/").get(getAllStudent).post(createStudent);
// router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

// export default router
export default router;
