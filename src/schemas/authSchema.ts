import { z } from "zod";

 export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(4, "Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(4, "Password must be at least 4 characters."),
});

