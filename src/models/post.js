const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    images: [
      {
        uri: {
          type: String,
        },
      },
    ],
    writer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
