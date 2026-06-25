import type { CreateBrainInput, GetBrainsQueryInput, BrainIdParams } from "./brain.schema.js";
import  Brain  from "./brain.model.js";
import AppError from "../../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";

type BrainInput = {
    ownerId: string;
    brainData: CreateBrainInput;
};

type GetBrainsInput = {
    ownerId: string;
    query: GetBrainsQueryInput;
};

type GetBrainByIdInput = {
    ownerId: string;
    brainId: string; 
};

export const createBrain = async (
    { ownerId, brainData }: BrainInput
) => {
    const normalizedTags = [...new Set(brainData.tags?.map(tag => tag.trim().toLowerCase()).filter(Boolean))];    //Boolean(value) converts a value to true or false

    const brain = await Brain.create({
        owner: ownerId,
        title: brainData.title,
        body: brainData.body  ?? null,
        url: brainData.url    ?? null,
        tags: normalizedTags,
    });
    return brain;
}


export const getBrains = async (
    { ownerId, query }: GetBrainsInput
) => {
    const { search, tags } = query;
    const mongoQuery: Record<string, unknown> = {
         owner: ownerId 
        }
    
    if (tags) {
        mongoQuery.tags = tags.trim().toLowerCase()
    }

    if (search) {
        mongoQuery.$or = [
            { title: { $regex: search, $options: "i" } },      // regex -> Match documents where the field matches this pattern.
            { tags: { $regex: search, $options: "i" } },      // The "i" stands for case-insensitive.
        ]
    }

    const brains = await Brain.find(mongoQuery).sort({ createdAt: -1 });    

    return brains;

}


export const getBrainById = async (
    { ownerId, brainId }: GetBrainByIdInput
) => {
    const brain = await Brain.findOne({
        _id: brainId,
        owner: ownerId
    })

    if(!brain) throw new AppError("Brain not found",StatusCodes.NOT_FOUND)

    return brain;   
}