import PageLoader from "@/components/layout/PageLoader";
import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";

import React from "react";

const Index = () => {
  const router = useRouter();
  let { passports } = usePassport();
  React.useEffect(() => {
    passports.loginCallback();
    router.push("/");

    return () => {};
  }, [router,passports]);

  return <PageLoader loading={true} />;
};

export default Index;
