"use client";

import { passport } from "@imtbl/sdk";
import { baseConfig } from "../passport.config";
import { baseUrl } from "@/utils/databaseMethods";

const usePassport = () => {
  const passports = new passport.Passport({
    baseConfig,
    clientId: "o5aqv2ZjzXgKQkGvZqEzVJ491DQ0bWsk",
    logoutRedirectUri: `${baseUrl}/logout`,
    redirectUri: "http://localhost:3000/auth",
    audience: "platform_api",
    scope: "openid offline_access email transact",
    // Passport specific configuration
  });

  const provider = passports.connectEvm();

  return { passports, provider };
};

export default usePassport;
