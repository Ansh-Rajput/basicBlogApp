import mongoose, { Document, Schema } from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String },
    videoUrl: { type: String },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;

// Define the Comment interface
export interface Comment {
  user: mongoose.Schema.Types.ObjectId;
  comment: string;
}

// Define the Blog interface
export interface IBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  imageUrl?: string;
  videoUrl?: string;
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Blog schema
// const BlogSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     imageUrl: { type: String },
//     videoUrl: { type: String },
//     comments: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//           required: true,
//         },
//         comment: { type: String, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // Create and export the Blog model
// const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
// export default Blog;
