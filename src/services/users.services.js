import { usersManager } from "../dao/users.dao.js"
import { hashData } from "../utils.js"

export const findAllUsers = (obj) => {
    const users = usersManager.findAll(obj)
    return users
}

export const findUserByEmail = (email) => {
    const user = usersManager.findByEmail(email)
    return user
}

export const getUserById = (id) => {
    const user = usersManager.findById(id)
    return user
}

export const upDateUser = (pid,data) => {
    const user = usersManager.updateOne(pid,data)
    return user
}

export const create = (obj) => {
    const hashedPassword = hashData(obj.password)
    const newObj = {...obj, password: hashedPassword}
    const user = usersManager.createOne(newObj)
    return user
}

export const deleteUserById = (id) => {
    const user = usersManager.deleteOne(id)
    return user
}