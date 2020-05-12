import { LOGIN, GETTOKEN, AMOUNTTOPUP } from "../Action/UserAction";

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
        amountCoin: action.userData.cash,
        // token: action.userData.tokens,
      };

    default:
      return state;
  }
};
