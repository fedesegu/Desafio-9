import { create, deleteUserById, findAllUsers, findUserByEmail, getUserById, upDateUser } from "../services/users.services.js";

export const findAll = async(req,res) => {
    try {
        const users = await findAllUsers(req.query)
        res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({ error });
      }
}

export const findByEmail = async(req,res) => {
    const { email } = req.params;
  try {
    const user = await findUserByEmail(email);
    res.status(200).json({ message: "User", user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const findUserById = async(req,res) => {
    try {
        const {uid} = req.params
        console.log(uid)
        const user = await getUserById(uid)
        if(!user){
            return res.status(404).json({message:"Not use found"})
        }
        return res.status(200).json({message:"User found"},user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
}

export const upDateById = async(req,res) => {
    try {
        const {pid} = req.params
        const data = req.body
        const product = await upDateUser(pid,data);
        res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ error });
      }
}

export const createUser = async(req,res) => {
    const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await create(req.body);
    //res.status(200).json({ message: "User created", user: createdUser });
    res.status(200).json({response:createdUser});
  } catch (error) {
    return res.status(500).json({ error });
  }
}


export const deleteUser = async(req,res) => {
  const { idUser } = req.params;
  try {
    await deleteUserById(idUser);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}