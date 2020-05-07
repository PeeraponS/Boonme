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
    poster_id: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    project_id: {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
