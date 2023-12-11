import dotenv from "dotenv"

dotenv.config()

export default {
    mongo_uri:process.env.MONGO_URI,
    secret_jwt:process.env.SECRET_KEY_JWT,
}