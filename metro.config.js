// const { getDefaultConfig } = require("metro-config");
// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts }
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer")
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== "svg"),
//       sourceExts: [
//         "expo.js",
//         "expo.ts",
//         "expo.tsx",
//         ...sourceExts,
//         "ts",
//         "tsx",
//         "mjs",
//         "js",
//         "jsx",
//         "svg"
//       ]
//     }
//   };
// })();
