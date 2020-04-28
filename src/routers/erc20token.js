const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleWare/auth");
const goodCoin = require("../../connectBlockchain/Mytoken");
const { buytoken } = require("../../connectBlockchain/BuyBoonmeToken");

// Check goodcoin balance
router.get("/erc20token/checkbalance", auth, async (req, res) => {
  try {
    console.log(req.user.bc_account.address);
    const balance = await goodCoin.checkBalance(req.user.bc_account.address);
    console.log(balance);
    res.send({
      goodcoin_balance: parseInt(balance, 10),
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/erc20token/buytoken", auth, async (req, res) => {
  try {
    const user = req.user;
    const goodcoinValue = req.body.value;

    //check if the user have enough cash to buy erc20token
    if (user.cash < goodcoinValue)
      return res
        .status(400)
        .send({ error: "you don't have enough of cash for buying goodcoin." });

    // buy token
    await buytoken(user.bc_account.address, goodcoinValue);

    res.status(200).send();
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

module.exports = router;
