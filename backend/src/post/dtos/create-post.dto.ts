import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreatePostDTO {
    @IsOptional()
    @IsString()
    text: string;
    @IsOptional()
    @IsArray()
    tags?: string[];
    @IsOptional()
    @IsString()
    imagePath?: string;
    @IsOptional()
    @IsString()
    author: string;
}
