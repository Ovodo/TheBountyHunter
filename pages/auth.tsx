import PageLoader from "@/components/layout/PageLoader";
import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";

import React from "react";

const auth = () => {
  const router = useRouter();
  React.useEffect(() => {
    let { passports } = usePassport();
    passports.loginCallback();
    router.push("/");

    return () => {};
  }, []);

  return <PageLoader loading={true} />;
};

export default auth;
