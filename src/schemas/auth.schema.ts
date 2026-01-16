import {z} from 'zod'

export const AuthSchema = z.object({
    email : z.string().email("invalid email format").max(100),
    password : z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must not exceed 20 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
})

export type AuthInput = z.infer<typeof AuthSchema>
export type AuthInputWithoutPassword=Omit<AuthInput,"password"> 