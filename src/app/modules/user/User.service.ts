
import User from './User.model';


const getAllUserFromDB = async () => {
    const users = await User.find().exec();
    return users
}
export const UserServices={
    getAllUserFromDB
}
