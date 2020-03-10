import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    Body,
    Param,
    Query,
    UseGuards,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { NewsService } from './news.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipe';
import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard';
import { User } from 'src/users/interfaces/user.interface';
import { GetUser } from 'src/auth/shared/decorators/get-user.decorator';

@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post('/posts')
    async createPost(
        @Res() res: Response,
        @Body() createPostDTO: CreatePostDTO,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const createdPost = await this.newsService.createPost(
            createPostDTO,
            author,
        );

        return res.status(HttpStatus.CREATED).json(createdPost);
    }

    @Get('/posts/:postId')
    async getPostById(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
    ) {
        const post = await this.newsService.getPostById(postId);

        return res.status(HttpStatus.OK).json(post);
    }

    @Get('/posts')
    async getPosts(@Res() res: Response, @Query('sort') sortQuery?: string) {
        const posts = await this.newsService.getPosts(sortQuery);

        return res.status(HttpStatus.OK).json(posts);
    }

    @Put('/posts/:postId')
    async editPost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @Body() createPostDTO: CreatePostDTO,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const editedPost = await this.newsService.editPost(
            postId,
            createPostDTO,
            author,
        );

        return res.status(HttpStatus.OK).json(editedPost);
    }

    @Delete('/posts/:postId')
    async deletePost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const deletedPost = await this.newsService.deletePost(postId, author);

        return res.status(HttpStatus.OK).json(deletedPost);
    }
}
