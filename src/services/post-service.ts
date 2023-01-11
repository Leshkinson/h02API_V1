import {posts, Post} from "../repositories/posts";
import {Blog} from "../repositories/blogs";
import {BlogService} from "./blog-service";

export class PostService {
    public getAll(): Post[] {
        return posts;
    }
    public create(title: string, shortDescription: string, content: string, blogId: string) {
        const blogService = new BlogService();
        const blog: Blog = blogService.find(blogId);
        if (blog) {
            const newPost: Post = {
                id: String(+(new Date)),
                title,
                shortDescription,
                content,
                blogId: blog.id,
                blogName: blog.name
            };
            posts.push(newPost);

            return newPost;
        }
    }

    public find(id: string) {
        const post: Post | undefined = posts.find(post => post.id === id);
        if (!post) throw new Error ('not find post');

        return post;
    }

    public getOne(id: string) {
        const findPost: Post | undefined = this.find(id);
        if (findPost) return findPost;
    }

    public update (id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const blogService = new BlogService();
        const blog: Blog | undefined = blogService.find(blogId);
        const updatePost: Post | undefined = this.find(id)
        if (blog && updatePost) {
            updatePost.title = title;
            updatePost.shortDescription = shortDescription;
            updatePost.content = content;

            return updatePost
        }
    }

    public delete(id: string) {
        const deletePost: Post = this.find(id)
        if (deletePost) {
            const index = posts.indexOf(deletePost)
            posts.splice(index, 1)
        }
    }

    public testingDelete() {
        posts.length = 0
        return posts
    }
}