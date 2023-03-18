const { getDefaultConfig } = require('expo/metro-config');
module.exports = (async () => {
    // const config = await getDefaultConfig(__dirname);

  const {
    transformer,
    resolver,
  } = await getDefaultConfig(__dirname);
//   const {transformer, resolver} = config;

  return {
    transformer: {
        ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
        ...resolver,
      assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
      sourceExts: [
        "expo.js",
        "expo.ts",
        "expo.tsx",
        ...resolver.sourceExts,
        "ts",
        "tsx",
        "mjs",
        "js",
        "jsx",
        "svg"
      ]
    }
  };
})();
