const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleWare/auth");
const goodCoin = require("../../connectBlockchain/Mytoken");
const { decrypt } = require("../../connectBlockchain/CreateAccounts");
const { transferto } = require("../../connectBlockchain/Testtransfer");

// Check goodcoin balance
router.post("/transaction/donate/:projectid", auth, async (req, res) => {
  try {
    // refuse any action if not found the project
    const project = await Project.findById(req.params.projectid);
    const isExpired =
      project.due_date.getTime() - new Date().getTime() < 0 ? true : false;
    if (!project | isExpired) return res.status(400).send();

    // check user goodcoin balance
    const balance = await goodCoin.checkBalance(req.user.bc_account.address);
    if (balance < req.body.donateValue)
      return res.status(400).send({
        error:
          "You have not enough of goodcoin, please buy it before you donate any campaign.",
      });

    // check if the value user want to donate exceed the remaining amonut of donation or not
    const campaignDonationAmount = await goodCoin.checkBalance(
      project.bc_address
    );
    const remaining_donation =
      project.max_donation_amount - campaignDonationAmount;
    if (remaining_donation < req.body.donate)
      return res.status(400).send({
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
    await transferto(
      fromAddress,
      privateKeyOne,
      campaignAddress,
      transferAmount
    );
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
