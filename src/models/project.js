const mongoose = require("mongoose");
const {
  registerCampaign,
} = require("../../connectBlockchain/TestCreateCampaign");
const {
  create_encrypted_account,
} = require("../../connectBlockchain/CreateAccounts");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "โครงการโลโซ",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project_type: {
      type: String,
      required: true,
      default: "ทุนการศึกษา",
    },
    description: {
      type: String,
      required: true,
      default:
        "เสกสรรค์โหลนลอจิสติกส์หมายปองสหัชญาณ แทงโก้ตื้บผิดพลาดโก๊ะแจ๊กเก็ต โอเลี้ยงก๋ากั่น เพทนาการกรอบรูปท็อปบู๊ทโอเคไบเบิล ตะหงิดครัวซองต์รอยัลตี้ เหมยเซาท์หน่อมแน้มมายาคติ แฟรี่มาร์จินฮองเฮาจังโก้ สปอต ดีพาร์ทเมนต์อิออน แรงผลักเบอร์เกอร์ฟอยล์ด็อกเตอร์อิมพีเรียล ดีพาร์ตเมนท์คอนเทนเนอร์ทัวริสต์ ศากยบุตร พาร์ทเนอร์แผดเผาเฮียอพาร์ทเมนท์เอ็นจีโอ นิรันดร์เยลลี่มวลชนเทคโน ไตรมาสด็อกเตอร์เคลม ภูมิทัศน์",
    },
    img: {
      type: String,
      required: true,
      default:
        "https://static.posttoday.com/media/content/2018/04/26/27EF9A802B11483297A4F053A128FB8E.jpg",
    },
    due_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    donation_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    max_donation_amount: {
      type: Number,
      required: true,
      default: 30000,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    bc_address: {
      type: String,
    },
    donation_recipients_blockchain: [
      {
        publicKey: {
          type: String,
        },
      },
    ],
    donors: [
      {
        donorId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    followers: [
      {
        followerId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// projectSchema.virtual("post", {
//   ref: "Post",
//   localField: "_id", //_id of user
//   foreignField: "projectId",
// });

projectSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id", //_id of project
  foreignField: "project_id",
});

// middle ware before
projectSchema.pre("save", async function (next) {
  // edit some variable before saving to the mongoDb

  const project = this;
  const beneficiary = "0x8233E9e38f5b13A97675f87D01262395901C58B8";
  const releaseTime = Math.floor(project.due_date.getTime() / 1000).toString();
  const maxamount = project.max_donation_amount;
  project.bc_address = await registerCampaign(
    (
      Math.floor(Math.random() * (10000000000000000 - 999999999999999)) +
      999999999999999
    ).toString(),
    beneficiary,
    releaseTime,
    maxamount
  );

  // tell that finish operation
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
