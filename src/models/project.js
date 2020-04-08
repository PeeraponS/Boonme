const mongoose = require("mongoose");
const sha256 = require("sha256");
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
    bc_account: {
      type: Object,
    },
    password_blockchain: {
      type: String,
      minlength: 6,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

// middle ware before
projectSchema.pre("save", async function (next) {
  // edit some variable before saving to the mongoDb
  const project = this;
  const password_blockchain = await sha256.x2(
    process.env.DUMMIE_PROJECT_PASSWORD
  );

  // create blockchain account
  bc_account = await create_encrypted_account(password_blockchain);
  project.bc_account = bc_account;
  project.password_blockchain = password_blockchain;

  // tell that finish operation
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
