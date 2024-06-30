import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

export class DatabaseService {
  cleint = new Client();
  database;
  storage; // Bucket

  constructor() {
    this.cleint
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.cleint);
    this.storage = new Storage(this.cleint);
  }

  // create post
  async createPost({ title, content, featuredImage, userId, status, slug }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: create Post :: error ::", error);
    }
  }

  // update post
  async updatePost(slug, { title, featuredImage, status, content }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: update Post :: error ::", error);
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: delete Post :: error ::", error);
    }
  }

  // get post
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: get Post :: error ::", error);
    }
  }

  // file upload service
  async fileUpload(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: upload file service :: error ::", error);
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  // file preview
  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    // queries is variable
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
