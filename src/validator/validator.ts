import {BlogService} from "../services/blog-service";
import {body, validationResult, CustomValidator} from 'express-validator';

export const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        };
    },
});

const isWebsiteUrlPattern: CustomValidator = (value: string) => {
    const patternURL = new RegExp(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/);
    if (!patternURL.test(value)) {
        throw new Error()
    }

    return true;
}

const isBodyIdPattern: CustomValidator = (value) => {
    const blogService = new BlogService()
    const blog = blogService.find(value)
    if (!blog) {
        throw new Error()
    }

    return true;
}

export const nameValidation = body('name')
    .trim()
    .isLength({max: 15})
    .withMessage("Name has incorrect length. (Name has more than 15 characters)")
    .notEmpty()
    .withMessage("Name has incorrect length. (Name is empty)")
    .isString()
    .withMessage("Name has incorrect value. (Name isn't string)");

export const descriptionValidation = body('description')
    .trim()
    .isLength({max: 500})
    .withMessage("Name has incorrect length. (Description has more than 500 characters)")
    .notEmpty()
    .withMessage("Name has incorrect length. (Name is empty)")
    .isString()
    .withMessage("Name has incorrect value. (Name isn't string)");

export const websiteUrlValidation = body('websiteUrl')
    .trim()
    .isLength({max: 100})
    .withMessage("YoutubeUrl has incorrect length. (YoutubeUrl has more than 100 characters)")
    .isString()
    .withMessage("YoutubeUrl has incorrect value. (YoutubeUrl is empty)")
    .custom(isWebsiteUrlPattern)
    .withMessage("YoutubeUrl has incorrect value. (YoutubeUrl doesn't match pattern)");

export const titleValidation = body('title')
    .trim()
    .isLength({max: 30})
    .withMessage("Title has incorrect length. (Title has more than 30 characters)")
    .notEmpty()
    .withMessage("Title has incorrect length. (Title is empty)")
    .isString()
    .withMessage("Title has incorrect value. (Title isn't string)");

export const shortDescriptionValidation = body('shortDescription')
    .trim()
    .isLength({max: 100})
    .withMessage("ShortDescription has incorrect length. (ShortDescription has more than 100 characters)")
    .notEmpty()
    .withMessage("ShortDescription has incorrect length. (ShortDescription is empty)")
    .isString()
    .withMessage("ShortDescription has incorrect value. (ShortDescription isn't string)");

export const contentDescriptionValidation = body('content')
    .trim()
    .isLength({max: 1000})
    .withMessage("Content has incorrect length. (Content has more than 1000 characters)")
    .notEmpty()
    .withMessage("Content has incorrect length. (Content is empty)")
    .isString()
    .withMessage("Content has incorrect value. (Content isn't string)");

export const blogIdValidation = body('blogId')
    .trim()
    .isString()
    .withMessage("BlogId has incorrect value. (BlogId doesn't string)")
    .custom(isBodyIdPattern)
    .withMessage("BlogId has incorrect value. (BlogId not found");

export const blogValidation = [nameValidation, descriptionValidation, websiteUrlValidation];
export const postValidation = [titleValidation, shortDescriptionValidation, shortDescriptionValidation, contentDescriptionValidation, blogIdValidation]