import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;