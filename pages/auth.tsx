import usePassport from "@/hooks/usePassport";
import { useRouter } from "next/router";

import React from "react";

const auth = () => {
  const router = useRouter();
  React.useEffect(() => {
    const { query } = router;
    console.log("query", query);

    for (let key in query) {
      sessionStorage.setItem(key, query[key] as string);
    }

    let { passports } = usePassport();
    passports.loginCallback();

    return () => {};
  }, []);

  return <p className='flex-1 items-start justify-center'>Kool</p>;
};

export default auth;
