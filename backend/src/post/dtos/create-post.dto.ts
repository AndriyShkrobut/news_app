import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreatePostDTO {
    @IsOptional()
    @IsString()
    readonly text: string;
    @IsOptional()
    @IsArray()
    readonly tags?: string[];
    @IsOptional()
    @IsString()
    readonly imagePath?: string;
    @IsOptional()
    @IsString()
    readonly author: string;
}
