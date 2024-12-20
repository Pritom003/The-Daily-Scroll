import mongoose, { Schema} from 'mongoose';
import {  TUser, UserModel } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema= new Schema<TUser,UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
        default: true,
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
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_pass),
  );
  next(); 
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
UserSchema.statics.isUserExistByemail = async function (email: string): Promise<TUser | null>
 {
  return await this.findOne({ email }).select('+password');
};

 UserSchema.statics.isPasswordmatched=async function(PlainPassword,HashPassword){
  return await bcrypt.compare(PlainPassword,HashPassword)
 }
 UserSchema.statics.isUserBlocked = async function (useremail :string) {
  const user = await this.findOne({ email: useremail, isBlocked: true });
  return user; 
};

// Mongoose Model
const User = mongoose.model<TUser,UserModel>('User', UserSchema);

export default User;
