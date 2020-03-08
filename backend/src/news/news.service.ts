import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dtos/create-post.dto';

@Injectable()
export class NewsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const postToCreate = await new this.postModel(createPostDTO);

        return postToCreate.save();
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.postModel.findById(postId);

        return post;
    }

    async getPosts(sortQuery: string): Promise<Post[]> {
        const posts = await this.postModel
            .find()
            .sort(sortQuery)
            .exec();

        return posts;
    }

    async editPost(
        postId: string,
        createPostDTO: CreatePostDTO,
    ): Promise<Post> {
        const postToEdit = await this.postModel.findByIdAndUpdate(
            postId,
            createPostDTO,
            { new: true },
        );

        return postToEdit;
    }

    async deletePost(postId: string): Promise<Post> {
        const postToDelete = await this.postModel.findByIdAndDelete(postId);

        return postToDelete;
    }
}
