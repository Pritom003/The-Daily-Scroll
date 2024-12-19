import mongoose, { Schema} from 'mongoose';
import { TName, TUser } from './User.interface';


const UserNameSchema = new Schema<TName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  });

const UserSchema= new Schema<TUser>(
  {
    name: UserNameSchema,
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
      },
      needsPasswordChange: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
   
  },
  {
    timestamps: true, 
  }
);

// Mongoose Model
const User = mongoose.model<TUser>('User', UserSchema);

export default User;
