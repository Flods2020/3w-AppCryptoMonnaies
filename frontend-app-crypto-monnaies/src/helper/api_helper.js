// const {
//   register,
// } = require("../../../backend-app-crypto-monnaies/controllers/userAuthController");

// export async function post(
//   url,
//   data,
//   config = {
//     URL: {
//       new: "http://localhost:5000",
//     },
//   }
// ) {
//   console.log("data ::::: ", data);
//   console.log("url ::::: ", url);

//   return new Promise((resolve, reject) => {
//     //************* */
//     // fetch(config.URL.new + url, {
//     //   method: "POST",
//     //   body: JSON.stringify(data),
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     // Authorization: `Bearer ${data}`,
//     //   },
//     // })
//     //************************ */
//     fetch(config.URL.new + url, register)
//       .then((response) => {
//         response
//           .json()
//           .then((data) => {
//             if (response.ok) {
//               resolve(data);
//             } else {
//               reject(data);
//             }
//           })
//           .catch((err) => reject(err));
//       })
//       .catch((error) => reject(error));
//   });
// }
