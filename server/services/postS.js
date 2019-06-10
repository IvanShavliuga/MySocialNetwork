'use strict';

import {
    Post
} from '../models/postM';


const getPosts = async (req, res, next) => {

    try {
        let userId = req.params.id
        let posts = await Post.find({userid: userId});

        if (posts.length > 0) {
            return res.status(200).json({
                'message': 'Posts fetched successfully',
                'data': posts
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No Posts found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

const getaPost = async (req, res, next) => {

    try {
        let post = await Post.findById(req.params.id);

        if (post) {
            return res.status(200).json({
                'message': `post with id ${req.params.id} fetched successfully`,
                'data': post
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No post found in the system'
        });

    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

const createPost = async (req, res, next) => {

    try {
        const {
            userid,
            username,
            title,
            body
        } = req.body

        if (userid === undefined || userid === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'user id is required',
                'field': 'user id'
            });
        }

        if (username === undefined || username === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'username is required',
                'field': 'username'
            });
        }

        if (body === undefined || body === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'body is required',
                'field': 'body'
            });
        }

        const postData = {
            userid,
            username,
            title,
            body
        }

        let newPost = await Post.create(postData);

        if (newPost) {
            return res.status(201).json({
                'message': 'successfully posted',
                'data': newPost
            });
        } else {
            throw new Error('something went worng');
        }


    } catch (err) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const {
            title,
            body
        } = req.body

        
        if (title === undefined || title === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'title is required',
                'field': 'title'
            });
        }

        if (body === undefined || body === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'body is required',
                'field': 'body'
            });
        }

        let postchange = {
            title,
            body
        };

        let postToUpdate = await Post.findByIdAndUpdate(postId, postchange, {
            new: true
        });

        if (postToUpdate) {
            return res.status(200).json({
                'message': 'post updated successfully',
                'data': postToUpdate
            });
        } else {
            throw new Error('something went wrong');
        }

    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }

}

const deletePost = async (req, res, next) => {
        try {
            const postId = req.params.id;

            if (postId === undefined || postId === '') {
                return res.status(422).json({
                    'code': 'REQUIRED_FIELD_MISSING',
                    'description': 'postId is required',
                    'field': 'postId'
                });
            }

            let postToDelete = await Post.findByIdAndDelete(postId);

            if (postToDelete) {
                return res.status(204).json({
                    'message': `friend with id ${postId} deleted successfully`
                });
            } 
    
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No post found in the system'
            });

        } catch (err) {
            return res.status(500).json({
                'code': 'SERVER_ERROR',
                'description': 'something went wrong, Please try again'
            });
        }
}

export {
    createPost,
    deletePost,
    updatePost,
    getPosts,
    getaPost
}