import { z } from 'zod';

const NameValSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const CreateUserValSchema = z.object({
  body: z.object({
    name: NameValSchema,
    gender: z.enum(['male', 'female', 'other'], { message: 'Gender must be one of male, female, or other' }),
    email: z.string().email({ message: 'Invalid email format' }),
    isBlocked: z.boolean().optional().default(false),
    needsPasswordChange: z.boolean().optional().default(false),
    role: z.enum(['admin', 'user'], { message: 'Role must be one of admin, user, or manager' }).default('user'),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const UpdateUserValSchema = z.object({
  body: z.object({
  
        name: NameValSchema.partial(), // Makes all fields of name optional
        gender: z.enum(['male', 'female', 'other']).optional(),
        email: z.string().email({ message: 'Invalid email format' }).optional(),
        isBlocked: z.boolean().optional(),
        needsPasswordChange: z.boolean().optional(),
        role: z.enum(['admin', 'user', 'manager']).optional(),
        isDeleted: z.boolean().optional(),
    
    
     
  }),
});

export const UserValidation = {
  CreateUserValSchema,
  UpdateUserValSchema,
};
