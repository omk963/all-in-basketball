import { z } from 'zod';

export const signUpSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    image: z.string().nonempty("Profile Image is required")
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const jerseySchema = z.object({
    number: z.string().min(1).max(2),
    color: z.string().nonempty("Color is required"),
    size: z.string().nonempty("Size is required"),
    description: z.string().min(10).max(1000),
});

export const playerSchema = z.object({
    height: z.string().min(1, "Height is required"),
    captain: z.boolean(),
    position: z.string().optional(),
    yearsOfExperience: z.coerce.number().int().positive().lte(99),
    teamName: z.string().max(50).optional(),
    color: z.string().nonempty("Color is required"),
    size: z.string().nonempty("Size is required"),
});