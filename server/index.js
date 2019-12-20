require("ignore-styles"); // ignore CSS files imported using import syntax
require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});
require("./server");
