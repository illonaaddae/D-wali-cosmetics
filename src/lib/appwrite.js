import { Client, Databases, Storage, ID, Query } from "appwrite";

// Appwrite Configuration
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6958431a0019cea078d0"); // D-Wali Cosmetics Project ID

export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = "dwali-db";
export const REVIEWS_COLLECTION_ID = "reviews";
export const CONTACTS_COLLECTION_ID = "contacts";
export const STORAGE_BUCKET_ID = "review-images";

// Helper function to generate unique IDs
export const generateId = () => ID.unique();

// Reviews API
export const reviewsApi = {
  // Create a new review
  create: async (reviewData) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        REVIEWS_COLLECTION_ID,
        generateId(),
        {
          name: reviewData.name,
          email: reviewData.email,
          rating: reviewData.rating,
          title: reviewData.title,
          review: reviewData.review,
          imageId: reviewData.imageId || "",
          approved: true, // Auto-approve reviews (change to false for moderation)
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },

  // Get all approved reviews
  getApproved: async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        REVIEWS_COLLECTION_ID,
        [
          Query.equal("approved", true),
          Query.orderDesc("createdAt"),
          Query.limit(20),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  // Upload review image and return file ID
  uploadImage: async (file) => {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        generateId(),
        file
      );
      return response.$id; // Return file ID, not URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Get image URL from file ID
  getImageUrl: (fileId) => {
    if (!fileId) return null;
    return `https://cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/preview?project=6958431a0019cea078d0&width=150&height=150`;
  },
};

// Contacts API
export const contactsApi = {
  // Create a new contact submission
  create: async (contactData) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        CONTACTS_COLLECTION_ID,
        generateId(),
        {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company || "",
          quantity: contactData.quantity || "",
          message: contactData.message,
          status: "new",
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },
};

export default client;
