import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class NewsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await new this.postModel(createPostDTO);

        return newPost.save();
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel
            .find()
            .sort('-created_at')
            .exec();

        return posts;
    }
}
