const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "โครงการโลโซ"
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    donationAmount: {
      type: Number,
      required: true,
      default: 0
    },
    maxDonationAmount: {
      type: Number,
      required: true,
      default: 30000
    },
    publicKeys: [
      {
        publicKey: {
          type: String
        }
      }
    ],
    followers: [
      {
        followerId: {
          type: String
        }
      }
    ],
    periodTimeProjectInDays: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
      default:
        "เสกสรรค์โหลนลอจิสติกส์หมายปองสหัชญาณ แทงโก้ตื้บผิดพลาดโก๊ะแจ๊กเก็ต โอเลี้ยงก๋ากั่น เพทนาการกรอบรูปท็อปบู๊ทโอเคไบเบิล ตะหงิดครัวซองต์รอยัลตี้ เหมยเซาท์หน่อมแน้มมายาคติ แฟรี่มาร์จินฮองเฮาจังโก้ สปอต ดีพาร์ทเมนต์อิออน แรงผลักเบอร์เกอร์ฟอยล์ด็อกเตอร์อิมพีเรียล ดีพาร์ตเมนท์คอนเทนเนอร์ทัวริสต์ ศากยบุตร พาร์ทเนอร์แผดเผาเฮียอพาร์ทเมนท์เอ็นจีโอ นิรันดร์เยลลี่มวลชนเทคโน ไตรมาสด็อกเตอร์เคลม ภูมิทัศน์"
    },
    completed: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      required: true,
      default:
        "https://static.posttoday.com/media/content/2018/04/26/27EF9A802B11483297A4F053A128FB8E.jpg"
    }
  },
  {
    timestamps: true
  }
);
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
