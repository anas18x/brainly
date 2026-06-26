import { z } from "zod";
import mongoose from "mongoose";


export const createBrainSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be at most 200 characters long"),
    body: z.string().trim().optional(),
    url: z.string().trim().url().optional(),
    tags: z.array(z.string().trim()).max(10).optional().default([]),
  })
  


export const updateBrainSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200).optional(),
    body: z.string().trim().optional(),
    url: z.string().trim().url("Invalid URL").optional().refine(
      (val) => val === "" || z.string().url().safeParse(val).success,
    ),
    tags: z.array(z.string().trim()).max(10).optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined  ||  data.body !== undefined ||
      data.url !== undefined    ||  data.tags !== undefined,
    {
      message: "At least one field must be provided for update",
    },
  );



export const getBrainsQuerySchema = z.object({
  search: z.string().trim().optional(),
  tags: z.string().trim().optional(),
});



// since MongoDB IDs are ObjectIds:
export const brainIdParamsSchema = z.object({
  id: z.string().refine(mongoose.Types.ObjectId.isValid, {
    message: "Invalid brain ID",
  }),
});

// since shareSlug is a string, we can just validate it as a non-empty string
export const shareSlugParamsSchema = z.object({
  shareSlug: z.string().trim().min(1),
});



export type CreateBrainInput = z.infer<typeof createBrainSchema>;
export type UpdateBrainInput = z.infer<typeof updateBrainSchema>;
export type GetBrainsQueryInput = z.infer<typeof getBrainsQuerySchema>;
export type BrainIdParams = z.infer<typeof brainIdParamsSchema>;
