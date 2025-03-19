import { z } from 'zod';

export const signUpSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    image: z.string().nonempty("Profile Image is required")
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})