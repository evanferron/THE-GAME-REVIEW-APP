import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
});

export const registerSchema = z.object({
    email: z.string().email("Email invalide"),
    username: z.string().min(3, "Nom d'utilisateur trop court"),
    password: z.string().min(6, "Mot de passe trop court"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});