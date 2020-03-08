export class CreatePostDTO {
    readonly text: string;
    readonly tags: string[];
    readonly imageUrl: string;
    // readonly user_id: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}
