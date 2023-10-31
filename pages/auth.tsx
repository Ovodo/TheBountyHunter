import PageLoader from "@/components/layout/PageLoader";
import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";

import React from "react";

const Index = () => {
  console.log("auth page");

  const router = useRouter();
  let { passports } = usePassport();
  React.useEffect(() => {
    try {
      passports.loginCallback();
    } catch (error) {
      console.log("login error", error);
    }

    router.push("/");
    return () => {};
  }, [router, passports]);

  return <PageLoader loading={true} />;
};

export default Index;
