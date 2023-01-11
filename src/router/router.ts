import {Router} from "express";
import {BlogController} from "../controllers/blog-controller";
import {PostController} from "../controllers/post-controller";
import {basicAuthorization} from "../authrizations/authorization";
import {
    contentDescriptionValidation,
    descriptionValidation,
    nameValidation,
    shortDescriptionValidation,
    titleValidation,
    websiteUrlValidation
} from "../validator/validator";
import {isErrorMiddleware} from "../middleware/catch-error";

export const router = Router();

/**Test**/
router.delete('/testing/all-data', BlogController.testing)

/**Blogs**/
router.get('/blogs', BlogController.getAllBlogs);
router.post('/blogs', basicAuthorization, nameValidation, descriptionValidation, websiteUrlValidation, isErrorMiddleware, BlogController.createBlog);
router.get('/blogs/:id', BlogController.getOneBlog);
router.put('/blogs/:id', basicAuthorization, BlogController.updateBlog);
router.delete('/blogs/:id', basicAuthorization, nameValidation, descriptionValidation, websiteUrlValidation, isErrorMiddleware, BlogController.deleteBlog);

/**Posts**/
router.get('/posts', PostController.getAllPosts);
router.post('/posts', basicAuthorization, titleValidation, shortDescriptionValidation, contentDescriptionValidation, isErrorMiddleware, PostController.createPost);
router.get('/posts/:id', PostController.getOnePost);
router.put('/posts/:id', basicAuthorization, titleValidation, shortDescriptionValidation, contentDescriptionValidation, isErrorMiddleware, PostController.updatePost);
router.delete('/posts/:id', basicAuthorization, PostController.deletePost);

