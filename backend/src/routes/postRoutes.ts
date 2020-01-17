import { Router } from 'express';
import postController from '../controllers/post.controller';

class PostRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', postController.getPosts);
        this.router.get('/:url', postController.getPost);
        this.router.post('/', postController.createPost);
        this.router.put('/:url', postController.updatePost);
        this.router.delete('/:url', postController.deletePost);
    }
    
}

const postRoutes = new PostRoutes();
export default postRoutes.router;