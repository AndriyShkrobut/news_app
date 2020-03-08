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
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

import { NewsService } from './news.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipe';
import { ErrorMessages } from './shared/consts/error-messages.const';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post('/posts')
    async createPost(
        @Res() res: Response,
        @Body() createPostDTO: CreatePostDTO,
    ) {
        const createdPost = await this.newsService.createPost(createPostDTO);

        return res.status(HttpStatus.CREATED).json(createdPost);
    }

    @Get('/posts/:postId')
    async getPostById(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
    ) {
        const post = await this.newsService.getPostById(postId);

        if (!post) throw new NotFoundException(ErrorMessages.NOT_FOUND);

        return res.status(HttpStatus.OK).json(post);
    }

    @Get('/posts')
    async getPosts(@Res() res: Response, @Query('sort') sortQuery = '') {
        const posts = await this.newsService.getPosts(sortQuery);

        return res.status(HttpStatus.OK).json(posts);
    }

    @Put('/posts/:postId')
    async editPost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @Body() createPostDTO: CreatePostDTO,
    ) {
        const editedPost = await this.newsService.editPost(
            postId,
            createPostDTO,
        );

        if (!editedPost) throw new NotFoundException(ErrorMessages.NOT_FOUND);

        return res.status(HttpStatus.OK).json(editedPost);
    }

    @Delete('/posts/:postId')
    async deletePost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
    ) {
        const deletedPost = await this.newsService.deletePost(postId);

        if (!deletedPost) throw new NotFoundException(ErrorMessages.NOT_FOUND);

        return res.status(HttpStatus.OK).json(deletedPost);
    }
}
