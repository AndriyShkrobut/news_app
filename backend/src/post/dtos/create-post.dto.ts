import { IsString, IsArray, IsDate, IsOptional } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    readonly text: string;
    @IsArray()
    readonly tags?: string[];
    @IsString()
    readonly imagePath?: string;
    @IsOptional()
    @IsString()
    readonly author: string;
    @IsOptional()
    @IsDate()
    readonly createdAt: Date;
    @IsOptional()
    @IsDate()
    readonly updatedAt: Date;
}
