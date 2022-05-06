import { Injectable, Inject, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Driver, QueryResult, Record } from 'neo4j-driver';
import { UserNode } from './interfaces/user-node.interface';

@Injectable()
export class UserRelationService {
    constructor(@Inject('Neo4j') private readonly _neo4j: Driver) {}

    async createUser(userData: UserNode): Promise<QueryResult> {
        const query = 'CREATE (user:User $userData) RETURN user';

        try {
            const { records } = await this._neo4j.session().run(query, { userData });
            const [newUser] = records;
            const { properties: createdUser } = newUser.get('user');

            return createdUser;
        } catch (error) {
            if (error.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
                // error code of duplicate key
                throw new ConflictException('User node already exists');
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async followUser(currentUserId: string, userToFollowId: string) {
        const query =
            'MATCH (a:User { id: $currentUserId }), (b:User { id: $userToFollowId }) CREATE (a)-[r:FOLLOW]->(b) RETURN a, b, r';

        try {
            const result = await this._neo4j.session().run(query, { currentUserId, userToFollowId });

            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async unFollowUser(currentUserId: string, userToFollowId: string) {
        const query = 'MATCH (a:User { id: $currentUserId })-[r:FOLLOW]->(b:User { id: $userToFollowId }) DELETE r';

        try {
            const result = await this._neo4j.session().run(query, {
                currentUserId,
                userToFollowId,
            });

            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getSuggestions(currentUserId: string): Promise<string[]> {
        const key = 'suggestion';
        const query = `MATCH (current:User { id: $currentUserId })
            MATCH (current)-[:FOLLOW*2]->(suggested:User)
            WHERE current <> suggested AND NOT (current)-[:FOLLOW]->(suggested)
            RETURN suggested.id AS ${key}, count(suggested) AS rating ORDER BY rating DESC`;

        try {
            const { records } = await this._neo4j.session().run(query, { currentUserId });
            
            return records.map((record: Record) => record.get(key));
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFollowing(userId: string): Promise<string[]> {
        const query = `MATCH (user:User { id: $userId })-[r:FOLLOW]->(following:User) RETURN following.id as following`;

        try {
            const { records } = await this._neo4j.session().run(query, { userId });

            return records.map((record: Record) => record.get('following'));
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getFollowers(userId: string): Promise<string[]> {
        const query = `MATCH (user:User { id: $userId })<-[r:FOLLOW]-(followers:User) RETURN followers.id as followers`;

        try {
            const { records } = await this._neo4j.session().run(query, { userId });

            return records.map((record: Record) => record.get('followers'));
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
