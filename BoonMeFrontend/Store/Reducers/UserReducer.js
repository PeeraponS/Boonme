import { LOGIN, AUTHENTICATE } from "../Action/UserAction";

// export const authenticate = (token, userId) => {
//   return {
//     type: AUTHENTICATE,
//     token,
//     userId,
//     token: token
//   };
// };

const initialState = {
  name: "",
  userpin: "",
  password: "",
  userId: "",
  amountCoin: "",
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      //   console.log("action.userData.userId");
      // console.log(action.userData);
      return {
        ...state,
        name: action.userData.name,
        userpin: action.userData.userpin,
        userId: action.userData._id,
        amountCoin: action.userData.goodcoin,
        token: action.userData.tokens,
      };
    default:
      return state;
  }
};
