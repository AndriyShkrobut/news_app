import { IsString, IsArray, IsDate } from 'class-validator';

export class CreateCommentDTO {
    @IsString()
    readonly postId: string;
    @IsString()
    readonly text: string;
    @IsArray()
    readonly tags?: string[];
    @IsString()
    readonly author: string;
    @IsDate()
    readonly createdAt: Date;
    @IsDate()
    readonly updatedAt: Date;
}
