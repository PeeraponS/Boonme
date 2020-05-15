import { LOGIN, GETTOKEN, GETCOIN } from "../Action/UserAction";

const initialState = {
  name: "",
  userpin: "",
  password: "",
  userId: "",
  amountCash: "",
  amountCoin: "",
  token: "",
  userAddress: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTOKEN:
      return {
        ...state,
        token: action.token,
      };
    case LOGIN:
      return {
        ...state,
        name: action.userData.name,
        userpin: action.userData.userpin,
        userId: action.userData._id,
        amountCash: action.userData.cash,
        // amountCoin: action.userData.goodcoin_balance,
        // userAddress: action.userData.useraddress,
        // token: action.userData.tokens,
      };
    case GETCOIN:
      return {
        ...state,
        amountCoin: action.coinData.goodcoin_balance,
        userAddress: action.coinData.useraddress,
      };

    default:
      return state;
  }
};
