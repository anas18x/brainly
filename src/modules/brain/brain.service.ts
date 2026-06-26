import type { CreateBrainInput, GetBrainsQueryInput, BrainIdParams, UpdateBrainInput } from "./brain.schema.js";
import  Brain  from "./brain.model.js";
import User from "../users/user.model.js";
import AppError from "../../utils/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";

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

type UpdateBrainServiceInput = {
    ownerId: string;
    brainId: string;
    brainData: UpdateBrainInput;
};

type DeleteBrainInput = {
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


export const updateBrain = async (
    { ownerId, brainId, brainData }: UpdateBrainServiceInput
) => {
    const updateData: Record<string, unknown> = {...brainData};
    if (brainData.tags) {
        updateData.tags = [...new Set(brainData.tags.map(tag => tag.trim().toLowerCase()).filter(Boolean))];
    }

    // null because if the user sends an empty string, we want to clear the field in the database.
    if (brainData.body === "") updateData.body = null;
    if (brainData.url === "")  updateData.url = null;

    const brain = await Brain.findOneAndUpdate(
        { _id: brainId, owner: ownerId },
        { $set: updateData },
        { returnDocument: "after", runValidators: true }
    );
    
    if(!brain) throw new AppError("Brain not found",StatusCodes.NOT_FOUND)

    return brain;
}


export const deleteBrain = async (
    { ownerId, brainId }: DeleteBrainInput
) => {
    const brain = await Brain.findOneAndDelete({
        _id: brainId,
        owner: ownerId
    });
    if (!brain) throw new AppError("Brain not found", StatusCodes.NOT_FOUND);

    return;
}


export const getTags = async (
    { ownerId }: { ownerId: string }
) => {
    //using distinct method to get unique tags for the specified owner
    const tags = await Brain.distinct("tags", { owner: ownerId });
    return tags;
}


export const enableBrainSharing = async (
    { userId }: { userId: string }
) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);

    // If the user already has a shareSlug and sharing is enabled, return the existing shareSlug
    if(user.shareSlug && user.isBrainPublic) {
        return { shareSlug: user.shareSlug };
    }

    const shareSlug = user.shareSlug ?? `${user.username}-${nanoid(6)}`;    // Generate a unique slug if it doesn't exist

    user.shareSlug = shareSlug;
    user.isBrainPublic = true;
    await user.save();

    return { shareSlug };
}


export const getPublicBrain = async (
    { shareSlug }: { shareSlug: string }
) => {
    const user = await User.findOne({ shareSlug, isBrainPublic: true }).select("username");
    if (!user) throw new AppError("brain not found", StatusCodes.NOT_FOUND);
    
    const brains = await Brain.find({ owner: user._id }).sort({ createdAt: -1 }).select("-owner -__v -updatedAt");  // Exclude owner, __v, and updatedAt fields from the result

    return { owner:{ username: user.username }, brains };
}   


export const disableBrainSharing = async (
    { userId }: { userId: string }
) => {
    const user = await User.findByIdAndUpdate(userId, { isBrainPublic: false }, { returnDocument: "after" });

    if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);

}