import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCommentDTO {
    @IsOptional()
    @IsString()
    postId: string;
    @IsString()
    text: string;
    @IsOptional()
    @IsArray()
    tags?: string[];
    @IsOptional()
    @IsString()
    author: string;
}
