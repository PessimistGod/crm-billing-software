import Signup from "@/Models/signup";
import connectDB from "@/Middleware/db";
import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";
connectDB();



export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { email, password } = req.body;

        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        let encryptedPass = user.password
        let checkPassword = CryptoJS.AES.decrypt(encryptedPass, process.env.NEXT_PUBLIC_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        if (password !== checkPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if(!user.isVerified){
            return res.status(401).json({ message: 'Please Signup' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, phone: user.phone, username: user.username, isVerified: user.isVerified }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}


