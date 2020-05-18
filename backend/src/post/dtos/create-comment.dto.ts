import { IsString, IsArray, IsDate, IsOptional } from 'class-validator';

export class CreateCommentDTO {
    @IsOptional()
    @IsString()
    readonly postId: string;
    @IsString()
    readonly text: string;
    @IsOptional()
    @IsArray()
    readonly tags?: string[];
    @IsOptional()
    @IsString()
    readonly author: string;
}
