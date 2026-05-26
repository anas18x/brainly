import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string().trim().min(3,"Username must be at least 3 characters long").max(20,"Username must be at most 20 characters long"),
    password: z.string().min(6,"Password must be at least 6 characters long")
})

export const loginSchema = z.object({
    username: z.string().trim().min(3,"Username must be at least 3 characters long").max(20,"Username must be at most 20 characters long"),
    password: z.string().min(6,"Password must be at least 6 characters long")
})

export const changePasswordSchema = z.object({
    oldPassword : z.string().min(6,"Old password must be at least 6 characters long"),
    newPassword : z.string().min(6,"New password must be at least 6 characters long")
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>