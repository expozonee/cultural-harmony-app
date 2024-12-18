import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    // vite config
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": JSON.stringify(env),
    },
  };
});
