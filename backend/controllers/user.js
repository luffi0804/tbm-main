import user from "../models/user.js";
import bcrypt from "../lib/bcrypt.js";
import jwt from "../lib/jwt.js";
import userService from "../services/user.js";


//---------------------------------------------------------------------------------

const registerUser = async (req, res) => {

  let pass = await bcrypt.hassGenerate(req.body.password);

  const schema = new user({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

//---------------------------------------------------------------------------------

const registerAdminUser = async (req, res) => {
  
  const passHash = await bcrypt.hassGenerate(req.body.password, 10);

  const userRegister = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userRegister.save();
  if(!result)
    return res.status(400).send({ message: "Failed to register user" })

    const token = await jwt.generateToken(result);

    return !token
      ? res.status(500).send({ message: "Failed to register user" })
      : res.status(200).send({ token }); 
};

//---------------------------------------------------------------------------------
const list = async (req, res) => {
  let statusFiler = req.params["status"];
  if (statusFiler === "true") {
    listUsers(req, res);
  } else {
    listAllUser(req, res);
  }
};

//--------------------------------------------------------------------------------

const listUsers = async (req, res) => {
  const userList = await user.find({
    $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: true }],
  })
    .populate("role") 
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "Empty users list" })
    : res.status(200).send({ userList });
};

//---------------------------------------------------------------------------------

const listAllUser = async (req, res) => {
  const userList = await user.find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "Empty users list" })
    : res.status(200).send({ userList });
};

//---------------------------------------------------------------------------------

const findUser = async (req, res) => {
  const userfind = await user.findById({ _id: req.params["_id"] })
    .populate("role")
    .exec();
  return !userfind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ userfind });
};

//---------------------------------------------------------------------------------

const getUserRole = async (req, res) => {
  let userRole = await user.findOne({ email: req.params.email })
    .populate("role")
    .exec();
  if (!userRole) return res.status(400).send({ message: "No search results" });

  userRole = userRole.role.name;
  return res.status(200).send({ userRole });
};

//---------------------------------------------------------------------------------

const updateUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.role)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";
  const searchUser = await user.findOne({ _id: req.body._id });

  //Funcion passwordChangeValidate() en el archivo ../lib/bcrypt.js
  pass = await bcrypt.passwordChangeValidate(req.body.password, searchUser);

  let changes = await userService.isChanges(req.body, pass);
  if (changes)
    return res.status(400).send({ mesagge: "you didn't make any changes" });

  const userUpdated = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email:req.body.email,
    password: pass,
    role: req.body.role,
  });

  return !userUpdated
    ? res.status(400).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

//---------------------------------------------------------------------------------

const deleteUser = async (req, res) => {
  if (!req.params["_id"]) return res.status(400).send("Incomplete data");

  const userDeleted = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !userDeleted
    ? res.status(400).send({ message: "User no found" })
    : res.status(200).send({ message: "User deleted" });
};

//---------------------------------------------------------------------------------

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Invalid Data" });

  const userLogin = await user.findOne({ email: req.body.email });
console.log(req.body);
console.log(userLogin);

  //Funcion validLogin en el archivo ..services/user.js
   const validLogin= await userService.validLogin(req.body, userLogin);
  if(!validLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Login error" })
    : res.status(200).send({ token });
};

export default {
  registerUser,
  registerAdminUser,
  listUsers,
  listAllUser,
  findUser,
  updateUser,
  deleteUser,
  login,
  getUserRole,
  list,
};
