import { passport } from "@imtbl/sdk";
import { baseConfig } from "../passport.config";

const passports = new passport.Passport({
  baseConfig,
  clientId: "o5aqv2ZjzXgKQkGvZqEzVJ491DQ0bWsk",
  logoutRedirectUri: "http://localhost:3000/logout",
  redirectUri: "http://localhost:3000/auth",
  audience: "platform_api",
  scope: "openid offline_access email transact",
  // Passport specific configuration
});

export type Provider = ReturnType<typeof passports.connectEvm>;
