import { useCallback, useState } from "react";

/**
 * custom hook used for http calls
 * returns an object with a sendRequest helper function and state variables (+state updating functions) for loading & error states
 */
const useHttp = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  /**
   * helper function for requests
   * requestConfig is of type: {url:string, method: string, body: object/string, headers: object }
   * processData - function that will fire when the fetch promise resolves with the data returned from API
   */
  const sendRequest = useCallback(async (requestConfig, processData) => {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        method: requestConfig.method || "GET",
        headers:
          requestConfig.method && requestConfig.method !== "GET"
            ? {
                "Content-Type": "application/json",
              }
            : undefined,
        body:
          requestConfig.method && requestConfig.method !== "GET"
            ? JSON.parse(requestConfig.body)
            : undefined,
      };

      const response = await fetch(requestConfig.url, options);

      const data = await response.json();

      //   console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      processData(data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendRequest, error, setError, isLoading, setIsLoading };
};

export default useHttp;
