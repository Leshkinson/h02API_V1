import {Blog, blogs} from "../repositories/blogs";

export class BlogService {

    public getAll(): Blog[] {
        return blogs;
    }

    public create(name: string, description: string, websiteUrl: string) {
        const newBlog: Blog = {
            id: String(+(new Date)),
            name,
            description,
            websiteUrl
        }
        blogs.push(newBlog);

        return newBlog;
    }

    public find(id: string) {
        const blog: Blog | undefined = blogs.find(blog => blog.id === id);
        if (!blog) throw new Error('not find blog');

        return blog;
    }

    public getOne(id: string) {
        const findBlog: Blog | undefined = this.find(id);
        if (findBlog) return findBlog;
    }

    public update(id: string, name: string, description: string, websiteUrl: string) {
        const updateBlog: Blog = this.find(id);
        if (updateBlog) {
            updateBlog.name = name;
            updateBlog.description = description;
            updateBlog.websiteUrl = websiteUrl;

            return updateBlog;
        }
    }

    public delete(id: string) {
        const deleteBlog: Blog = this.find(id);
        if (deleteBlog) {
            const index = blogs.indexOf(deleteBlog);
            blogs.splice(index, 1);
        }
        throw new Error()
    }

    public testingDelete() {
        blogs.length = 0
        return blogs
    }
}