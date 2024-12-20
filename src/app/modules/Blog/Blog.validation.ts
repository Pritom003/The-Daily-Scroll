import { z } from 'zod';


const createblogValidationSchema = z.object({
    body:z.object({
        title: z.string({
          required_error: 'Title is required',
        }).min(1, 'Title must not be empty').trim(),
      
        content: z.string({
          required_error: 'Content is required',
        }).min(1, 'Content must not be empty'),

      
        isPublished: z.boolean().optional(), 
        
        isDeletedv: z.boolean().optional(), 
      })
})

const UpdateblogValidationSchema = z.object({
    body:z.object({
        title: z.string({
          required_error: 'Title is required',
        }).min(1, 'Title must not be empty').trim().optional(),
      
        content: z.string({
          required_error: 'Content is required',
        }).min(1, 'Content must not be empty').optional(),

        isDeletedv: z.boolean().optional(), 
    
      })
})
export  const BlogValidationScheema={
    createblogValidationSchema,UpdateblogValidationSchema
}