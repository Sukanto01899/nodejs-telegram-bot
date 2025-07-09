const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "..", ".env");
const envData = fs.readFileSync(envPath, "utf8");

const loadEnv = () => {
  const lines = envData.split("\n");
  const envVars = {};

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) return;

    const [key, ...valueParts] = trimmedLine.split("=");

    const value = valueParts.join("=").trim();

    envVars[key.trim()] = value.replace(/^"|"$/g, "");
  });

  Object.assign(process.env, envVars);
};

module.exports = loadEnv