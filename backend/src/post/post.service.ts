import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ERROR_MESSAGES } from './shared/consts';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly _postModel: Model<Post>) {}

    async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const postToCreate = new this._postModel(createPostDTO);

        return await postToCreate.save();
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this._postModel.findById(postId).populate('author');

        if (!post) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return post;
    }

    async getPosts(sortQuery?: string): Promise<Post[]> {
        const posts = await this._postModel
            .find()
            .populate('author')
            .sort(sortQuery)
            .exec();

        return posts;
    }

    async getPostsByUserId(userId: string, sortQuery?: string): Promise<Post[]> {
        const posts = await this._postModel
            .find({ author: userId })
            .populate('author')
            .sort(sortQuery)
            .exec();

        return posts;
    }

    async editPost(postId: string, createPostDTO: CreatePostDTO, author: string): Promise<Post> {
        const postToEdit = await this._postModel.findOneAndUpdate(
            {
                _id: postId,
                author,
            },
            createPostDTO,
            { new: true },
        );

        if (!postToEdit) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return postToEdit;
    }

    async deletePost(postId: string, author: string): Promise<Post> {
        const postToDelete = await this._postModel.findOneAndDelete({
            _id: postId,
            author,
        });

        if (!postToDelete) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return postToDelete;
    }
}
