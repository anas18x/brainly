import {z} from 'zod'


export const createBrainSchema = z.object({
    title : z.string().trim().min(1,"Title is required").max(200,"Title must be at most 200 characters long"),
    body : z.string().trim().optional(),
    url : z.string().trim().url().optional(),
    tags : z.array(z.string().trim()).optional().default([]),
}) .refine((data) => data.body || data.url, {
    message: "Either body or url must be provided",
})


export const updateBrainSchema = z.object({
    title : z.string().trim().min(1,"Title is required").max(200).optional(),
    body : z.string().trim().min(1).optional(),
    url : z.string().trim().url().optional(),
    tags : z.array(z.string().trim()).optional(),
}) .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
})


export const getBrainsQuerySchema = z.object({
  search: z.string().trim().optional(),
})


export type CreateBrainInput = z.infer<typeof createBrainSchema>
export type UpdateBrainInput = z.infer<typeof updateBrainSchema>
export type GetBrainsQueryInput = z.infer<typeof getBrainsQuerySchema>