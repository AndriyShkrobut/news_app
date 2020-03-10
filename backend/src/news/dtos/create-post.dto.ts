export class CreatePostDTO {
    readonly text: string;
    readonly tags?: string[];
    readonly imageUrl?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
