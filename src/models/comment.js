const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    rating_score: {
      type: Number,
    },
    commentator_id: {
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
