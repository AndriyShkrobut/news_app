import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';

import { NewsService } from './news.service';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    async createPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.newsService.createPost(createPostDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Post successfully created!',
            post: newPost,
        });
    }

    @Get()
    async getPosts(@Res() res) {
        const posts = await this.newsService.getPosts();

        return res.status(HttpStatus.OK).json(posts);
    }
}
