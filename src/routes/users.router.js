import { userServices } from "../services/users.services.js"

export const userController = {
    current: async (req, res) => {
        try {
            const user = req.user;
            const userFromDB = await userServices.findById(user._id);
            res.json({ message: "User", userFromDB });
        } catch (error) {
            console.log(error);
            res.status(401).json("Not authorized", error)
        }
    }
};