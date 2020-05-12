const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleWare/auth");
const goodCoin = require("../../connectBlockchain/Mytoken");
const { decrypt } = require("../../connectBlockchain/CreateAccounts");
const { transferto } = require("../../connectBlockchain/Testtransfer");
const Transaction = require("../models/transaction");

// get all tx
router.get("/transaction", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all tx related to this user
router.get("/transaction/own", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ donor_id: req.user });
    res.send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
});

// donate
router.post("/transaction/donate/:projectid", auth, async (req, res) => {
  try {
    // refuse any action if not found the project
    const project = await Project.findById(req.params.projectid);
    const isExpired =
      project.due_date.getTime() - new Date().getTime() < 0 ? true : false;
    if (!project | isExpired)
      return res.status(400).send({
        error: "expired or not found project",
        project,
        isExpired,
      });

    // check user goodcoin balance
    const balance = await goodCoin.checkBalance(req.user.bc_account.address);
    if (balance < req.body.donate)
      return res.status(400).send({
        error:
          "You have not enough of goodcoin, please buy it before you donate any campaign.",
        balance,
        donate: req.body.donate,
      });

    // check if the value user want to donate exceed the remaining amonut of donation or not
    const campaignDonationAmount = await goodCoin.checkBalance(
      project.bc_address
    );

    const remaining_donation =
      project.max_donation_amount - campaignDonationAmount;
    if (remaining_donation < req.body.donate)
      return res.status(400).send({
        error: "donation amout is too high",
        remaining_donation,
        your_donate: req.body.donate,
      });

    // transfer to campaign
    const user = req.user;
    const decoded_bc = await decrypt(user.bc_account, user.password);
    const fromAddress = decoded_bc.address;
    const privateKeyOne = decoded_bc.privateKey.replace(/^0x/, "");
    const campaignAddress = project.bc_address;
    const transferAmount = req.body.donate;
    const txHash = await transferto(
      fromAddress,
      privateKeyOne,
      campaignAddress,
      transferAmount
    );

    // *****************************************************************
    // *** update value back to these tables, (1. project, 2. transaction) ***
    // *****************************************************************

    // *** project - table
    // update donation amount
    project.donation_amount = project.donation_amount + transferAmount;
    // update is_completed
    if (project.donation_amount == project.max_donation_amount)
      project.is_completed = true;

    // update donors
    const isAlreadyDonate = project.donors.filter(
      (donor) => donor.donorId.toString() == req.user._id
    )[0];
    if (!isAlreadyDonate) {
      project.donors = project.donors.concat({
        donorId: req.user._id,
      });
    }
    await project.save();

    // *** transaction - table
    const transaction = new Transaction({
      tx_hash: txHash,
      donor_id: user._id,
      donor_address: fromAddress,
      project_address: campaignAddress,
      donation_amount: transferAmount,
    });
    await transaction.save();

    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
