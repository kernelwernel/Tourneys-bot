import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email: String,
    username: String
})

export default mongoose.model("users", schema)