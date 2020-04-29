const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    tx_hash: {
      type: String,
      required: true,
    },
    donor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    donor_address: {
      type: String,
      required: true,
    },
    project_address: {
      type: String,
      required: true,
    },
    donation_amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
