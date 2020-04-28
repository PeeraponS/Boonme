require("dotenv").config();
const axios = require("axios");
const userId = process.env.USER_ID;
const userAuthenToken = process.env.USER_AUTHEN_TOKEN;
const baseUrl = process.env.HEROKU_APP_URL;

// // Send a POST request
// const login = async () => {
//   const result = await axios({
//     method: "post",
//     url: "https://aqueous-beach-98436.herokuapp.com/users/login",
//     data: {
//       email: "tester@mail.com",
//       password: "tttttttttt"
//     }
//   });
//   console.log(result.data);
// };

// // Send a POST request
// const updateUserpin = async () => {
//   let userpin = 4822; //change 'userAuthenToken' to 'user_token'
//   let usertoken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdmNGMzNDA5MDFmYzAwMDQwODkwY2YiLCJpYXQiOjE1ODU0MDA4ODR9.zNuwxOYZATV5bYevRWNOcsE0oK9Wqcv8rxtKEMGIcqE";
//   let Authorization = `Bearer ${usertoken}`; //change 'userAuthenToken' to 'user_token'
//   const result = await axios({
//     method: "patch",
//     url: `https://aqueous-beach-98436.herokuapp.com/users/5e7f4c340901fc00040890cf/updatepin`,
//     data: {
//       userpin
//     },
//     headers: {
//       Authorization
//     }
//   });
//   console.log(result.data);
// };
// updateUserpin();

// // Send a POST request
// const getUserProfile = async () => {
//   let url = `https://aqueous-beach-98436.herokuapp.com/users/me`; //change 'userId' to userId
//   let usertoken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdmNGMzNDA5MDFmYzAwMDQwODkwY2YiLCJpYXQiOjE1ODU0MDA4ODR9.zNuwxOYZATV5bYevRWNOcsE0oK9Wqcv8rxtKEMGIcqE";
//   let Authorization = `Bearer ${usertoken}`; //change 'userAuthenToken' to 'user_token'

//   try {
//     const result = await axios({
//       method: "get",
//       url,
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// getUserProfile();

// Send a POST request to logout
const logout = async () => {
  let url = `${baseUrl}/users/logout`; //change 'userId' to userId
  let usertoken = userAuthenToken;
  let Authorization = `Bearer ${usertoken}`; //change 'userAuthenToken' to 'user_token'

  try {
    const result = await axios({
      method: "post",
      url,
      headers: {
        Authorization,
      },
    });

    console.log(result.data);
  } catch (err) {
    console.log(err.message);
  }
};

// // Send a POST request
// const buyGoodcoin = async goodcoinValue => {
//   let url = `https://aqueous-beach-98436.herokuapp.com/users/${userId}/buytoken`; //change 'userId' to userId
//   let Authorization = `Bearer ${userAuthenToken}`; //change 'userAuthenToken' to 'user_token'

//   try {
//     const result = await axios({
//       method: "post",
//       url,
//       data: {
//         goodcoinValue
//       },
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // Send a POST request
// const buyGoodcoin = async goodcoinValue => {
//   const userId = ""; //change 'userId' to userId
//   const userAuthenToken = ""; //change 'userAuthenToken' to 'user_token'
//   let url = `https://aqueous-beach-98436.herokuapp.com/users/${userId}/buytoken`;
//   let Authorization = `Bearer ${userAuthenToken}`;

//   try {
//     const result = await axios({
//       method: "post",
//       url,
//       data: {
//         goodcoinValue
//       },
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // Send a POST request
// const buyGoodcoin = async goodcoinValue => {
//   // const userId = ""; //change 'userId' to userId
//   // const userAuthenToken = ""; //change 'userAuthenToken' to 'user_token'
//   let url = `${baseUrl}/users/${userId}/buytoken`;
//   let Authorization = `Bearer ${userAuthenToken}`;
//   console.log(url);
//   console.log(Authorization);

//   try {
//     const result = await axios({
//       method: "post",
//       url,
//       data: {
//         goodcoinValue
//       },
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // Send a POST request
// const depositCash = async depositValue => {
//   const userId = ""; //change 'userId' to userId
//   const userAuthenToken = ""; //change 'userAuthenToken' to 'user_token'
//   const url = `${baseUrl}/users/${userId}/depositcash`;
//   const Authorization = `Bearer ${userAuthenToken}`;
//   console.log(url);
//   console.log(Authorization);

//   try {
//     const result = await axios({
//       method: "post",
//       url,
//       data: {
//         deposit: depositValue
//       },
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// depositCash(200);

// // Send a POST request
// const refreshUserInfo = async () => {
//   const url = `${baseUrl}/users/${userId}/depositcash`;
//   const Authorization = `Bearer ${userAuthenToken}`;

//   try {
//     const result = await axios({
//       method: "get",
//       url,
//       headers: {
//         Authorization
//       }
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// // Send a POST request
// const createUser = async () => {
//   const baseUrl = "https://aqueous-beach-98436.herokuapp.com";
//   const url = `${baseUrl}/users`;
//   console.log(url);
//   const data = {
//     username: "noratesting",
//     email: "tmptesting@mail.com",
//     password: "123456789"
//   };

//   try {
//     const result = await axios({
//       method: "post",
//       url: url,
//       data: data
//       // but you can write only
//       // url,
//       // data,
//     });

//     console.log(result.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
