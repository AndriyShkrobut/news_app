import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from './interfaces/comment.interface';
import { ERROR_MESSAGES } from './shared/consts';
import { CreateCommentDTO } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private readonly _commentModel: Model<Comment>) {}

    async createComment(createCommentDTO: CreateCommentDTO): Promise<Comment> {
        const commentToCreate = new this._commentModel(createCommentDTO);

        return await commentToCreate.save();
    }

    async getCommentsByPostId(postId: string): Promise<Comment[]> {
        const comments = await this._commentModel.find({ postId });

        if (!comments) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return comments;
    }

    async editComment(commentId: string, createCommentDTO: CreateCommentDTO, author: string): Promise<Comment> {
        const commentToEdit = await this._commentModel.findOneAndUpdate(
            {
                _id: commentId,
                author,
            },
            createCommentDTO,
            { new: true },
        );

        if (!commentToEdit) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return commentToEdit;
    }

    async deleteComment(commentId: string, author: string): Promise<Comment> {
        const commentToDelete = await this._commentModel.findOneAndDelete({ _id: commentId, author });

        if (!commentToDelete) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
        }

        return commentToDelete;
    }

    async deleteCommentsByPostId(postId: string): Promise<boolean> {
        const status = await this._commentModel.deleteMany({ postId });

        if (!status.ok) {
            throw new InternalServerErrorException('Cant delete comment');
        }

        return true;
    }
}
