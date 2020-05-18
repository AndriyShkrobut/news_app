import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { PostService } from './post.service';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipe';
import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard';
import { User } from 'src/user/interfaces/user.interface';
import { GetUser } from 'src/auth/shared/decorators/get-user.decorator';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly _postService: PostService, private readonly _commentService: CommentService) {}

    @Post('/')
    async createPost(@Res() res: Response, @Body() createPostDTO: CreatePostDTO, @GetUser() user: User) {
        const { id: author } = user;

        const createdPost = await this._postService.createPost({ ...createPostDTO, author });

        return res.status(HttpStatus.CREATED).json(createdPost);
    }

    @Get('/:postId')
    async getPostById(@Res() res: Response, @Param('postId', new ValidateObjectId()) postId: string) {
        const post = await this._postService.getPostById(postId);

        return res.status(HttpStatus.OK).json(post);
    }

    @Get('/')
    async getPosts(@Res() res: Response, @Query('sort') sortQuery?: string) {
        const posts = await this._postService.getPosts(sortQuery);

        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('users/:userId')
    async getPostsByUser(
        @Res() res: Response,
        @Param('userId', new ValidateObjectId()) userId: string,
        @Query('sort') sortQuery?: string,
    ) {
        const posts = await this._postService.getPostsByUserId(userId);

        return res.status(HttpStatus.OK).json(posts);
    }

    @Put('/:postId')
    async editPost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @Body() createPostDTO: CreatePostDTO,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const editedPost = await this._postService.editPost(postId, createPostDTO, author);

        return res.status(HttpStatus.OK).json(editedPost);
    }

    @Delete('/:postId')
    async deletePost(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const deletedPost = await this._postService.deletePost(postId, author);

        return res.status(HttpStatus.OK).json(deletedPost);
    }

    @Post('/:postId/comments')
    async createComment(
        @Res() res: Response,
        @Param('postId', new ValidateObjectId()) postId: string,
        @Body() createCommentDTO: CreateCommentDTO,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const createdComment = await this._commentService.createComment({ ...createCommentDTO, author, postId });

        return res.status(HttpStatus.CREATED).json(createdComment);
    }

    @Get('/:postId/comments')
    async getCommentsByPostId(@Res() res: Response, @Param('postId', new ValidateObjectId()) postId: string) {
        const comments = await this._commentService.getCommentsByPostId(postId);

        return res.status(HttpStatus.OK).json(comments);
    }

    @Put('/:postId/comments/:commentId')
    async editComment(
        @Res() res: Response,
        @Param('commentId', new ValidateObjectId()) commentId: string,
        @Body() createCommentDTO: CreateCommentDTO,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const editedComment = await this._commentService.editComment(commentId, createCommentDTO, author);

        return res.status(HttpStatus.OK).json(editedComment);
    }

    @Delete('/:postId/comments/:commentId')
    async deleteComment(
        @Res() res: Response,
        @Param('commentId', new ValidateObjectId()) commentId: string,
        @GetUser() user: User,
    ) {
        const { id: author } = user;

        const deletedComment = await this._commentService.deleteComment(commentId, author);

        return res.status(HttpStatus.OK).json(deletedComment);
    }
}
