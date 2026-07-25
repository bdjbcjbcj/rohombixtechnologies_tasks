import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: String, // change to mongoose.Schema.Types.ObjectId if your blog _id is always a Mongo ObjectId
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true } // gives createdAt / updatedAt automatically
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;