// import mongoose, { Schema, Document, Model, models } from "mongoose";

// // TypeScript interface
// export interface IUser extends Document {
//   username?: string;  // Optional
//   email: string;      // Required for registration
//   gender?: "male" | "female" | "other"; // Optional
//   age?: number;      // Optional
//   profilePic?: string; // Optional
//   likes: number;      // Default value (0)
//   followers: mongoose.Types.ObjectId[];  // Default empty array
//   followed: mongoose.Types.ObjectId[];  // Default empty array
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Mongoose Schema
// const UserSchema: Schema<IUser> = new Schema(
//   {
//     username: { type: String, required: false, unique: true }, // Optional
//     email: { type: String, required: true, unique: true },    // Required for registration
//     gender: { type: String, enum: ["male", "female", "other"], required: false }, // Optional
//     age: { type: Number, required: false }, // Optional
//     profilePic: { type: String, required: false }, // Optional
//     likes: { type: Number, default: 0 }, // Default to 0
//     followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Default to empty array
//     followed: [{ type: Schema.Types.ObjectId, ref: "User" }], // Default to empty array
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt
//   }
// );

// // Export model
// export const User: Model<IUser> = models.User || mongoose.model<IUser>("User", UserSchema);

import mongoose, { Schema, Document, Model, models } from "mongoose";

// TypeScript interface
export interface IUser extends Document {
  username?: string;
  email: string;
  gender?: "male" | "female" | "other";
  age?: number;
  profilePic?: string;
  likes: number;
  followers: mongoose.Types.ObjectId[];
  followed: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      sparse: true, 
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followed: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Export model
export const User: Model<IUser> = models.User || mongoose.model<IUser>("User", UserSchema);
