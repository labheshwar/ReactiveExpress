import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
        default: false,
    }
}, {
    timeStamps: true // adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);
export default User;

 