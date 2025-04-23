import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "password too short"),
});

export const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    pseudo: z.string().min(3, "Nickname too short"),
    password: z.string().min(6, "Password too short"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});