module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ts", ".tsx"],
        alias: {
          "components": "./components",
          "constants": "./constants",
          "screens": "./screens",
          "services": "./services",
          "utils": "./utils",
          "App": "./App",
        },
      },
    ],
  ],
};
