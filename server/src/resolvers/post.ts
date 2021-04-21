import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    // return all Posts
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext):Promise<Post[]> {
        return em.find(Post, {})
    }

    // return Post by ID
    @Query(() => Post, { nullable: true })
    post(
        @Arg('id') _id: number,
        @Ctx() { em }: MyContext
        ):Promise<Post | null> {
        return em.findOne(Post, { _id })
    }

    // Create Post
    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ):Promise<Post> {
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post
    }

    // Update Post
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('id') _id: number,
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ):Promise<Post | null> {
        const post = await em.findOne(Post, {_id})
        if (!post) {
            return null
        }
        if (typeof title !== 'undefined') {
            post.title = title
            await em.persistAndFlush(post)
        }
        return post
    }

    // Delete post by ID
    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') _id: number,
        @Ctx() { em }: MyContext
    ):Promise<boolean> {
        try {
            await em.nativeDelete(Post, {_id})
            return true
        } catch (_) {
            return false
        }
    }
}