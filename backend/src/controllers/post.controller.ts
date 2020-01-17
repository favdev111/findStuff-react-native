import { Request, Response } from "express";
import Post from "../models/Post";
import mongodb from "mongodb";

class PostController {
  public async getPosts(req: Request, res: Response): Promise<void> {
    const posts = await Post.find();
    res.json(posts);
  }

  public async getPost(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const post = await Post.findOne({
        _id: new mongodb.ObjectID(url)
      });

      if (!post)
        return res.status(400).json({
          success: false,
          msg: "Post not found"
        });

      res.status(200).json({
        success: true,
        msg: "Post found",
        post
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(404).json({
        success: false,
        msg: "Post not found."
      });
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, url, content, image } = req.body;

      const newPost = new Post({ title, url, content, image });
      await newPost.save();

      res.status(200).json({
        success: true,
        msg: "Post saved.",
        post: newPost
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Post not saved"
      });
    }
  }

  public async updatePost(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedPost = await Post.findOneAndUpdate(
        { _id: new mongodb.ObjectID(url) },
        req.body,
        {
          new: true
        }
      );

      if (!updatedPost)
        return res.status(400).json({
          success: false,
          msg: "Post not updated"
        });

      res.status(200).json({
        success: true,
        msg: "Post updated.",
        post: updatedPost
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Post not updated"
      });
    }
  }

  public async deletePost(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const deletedPost = await Post.findOneAndDelete(
        { _id: new mongodb.ObjectID(url) },
        req.body
      );

      if (!deletedPost)
        return res.status(400).json({
          success: false,
          msg: "Post not deleted"
        });

      res.status(200).json({
        success: true,
        msg: "Post deleted.",
        post: deletedPost
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Post not deleted"
      });
    }
  }
}

export default new PostController();
