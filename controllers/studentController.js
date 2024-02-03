import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";

/**
 * @DESC Get all student data
 * @ROUTE /api/v1/student
 * @method GET
 * @access public
 */
export const getAllStudent = asyncHandler(async (req, res) => {
  const student = await Student.find();

  if (student.length > 0) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: "Student Not Found" });
  }
});

/**
 * @DESC Get Single users data
 * @ROUTE /api/v1/user/:id
 * @method GET
 * @access public
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(user);
});

/**
 * @DESC Create new Student
 * @ROUTE /api/v1/student
 * @method POST
 * @access public
 */
export const createStudent = asyncHandler(async (req, res) => {
  const { name, email, mobile, gender, photo } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check user email
  const studentEmailCheck = await Student.findOne({ email });

  if (studentEmailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // create new Student
  const student = await Student.create({
    name,
    email,
    mobile,
    photo,
    gender,
  });

  res.status(200).json({ student, message: `${name} user created successful` });
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access public
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json(user);
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, mobile, password, gender } = req.body;

  if (!name || !email || !mobile || !password || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      mobile,
      password,
      gender,
    },
    { new: true }
  );

  res.status(200).json(user);
});
