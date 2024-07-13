import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client(); // Client properties
  account; // Account variable

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your project URL or Endpoint
      .setProject(config.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }

  // Create Account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Create Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const response = await this.account.get();
      return response;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  // Create Logout System
  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite logout error:", error);
      throw error;
    }
  }
}

// Create object
const authService = new AuthService();

export default authService;
