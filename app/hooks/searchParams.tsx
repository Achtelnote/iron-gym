import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useGetAllSearchParams() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState({
    params: {},
    queryString: ""
  });

  useEffect(() => {
    const tmpParams: { [anyProp: string]: string } = {};
    searchParams.entries().forEach(([key, value]) => {
      tmpParams[key] = value;
    });

    const tmpQueryString = Object.keys(tmpParams)
    .filter((key) => tmpParams[key] !== "" && tmpParams[key] != null)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(tmpParams[key])}`)
    .join("&");

    setParams({
      params: tmpParams,
      queryString: tmpQueryString.length ? `?${tmpQueryString}` : ""
    });

  }, [searchParams]);

  return params;
}
