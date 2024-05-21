import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://chenweilunaa:vfcBiqreQRDFksxI@cluster0.bavizgr.mongodb.net/todo-app')
    console.log('DB Connected');
}