import type { CreateBrainInput } from "./brain.schema.js";
import  Brain  from "./brain.model.js";

type BrainServiceInput = {
    ownerId: string;
    brainData: CreateBrainInput;
};

export const createBrain = async (
    { ownerId, brainData }: BrainServiceInput
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