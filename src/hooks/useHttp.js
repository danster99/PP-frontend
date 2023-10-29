import { useCallback, useState } from "react";

/**
 * custom hook used for http calls
 * returns an object with a sendRequest helper function and state variables (+state updating functions) for loading & error states
 */
const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * helper function for requests
   * requestConfig is of type: {url:string, method: string, body: object/string, headers: object }
   * processData - function that will fire when the fetch promise resolves with the data returned from API
   * returns: boolean to set 'true' if we want the fetched data to be returned as a promise
   */
  const sendRequest = useCallback(
    async (requestConfig, processData, returns = false) => {
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

        if (!response.ok) {
          throw new Error("Something went wrong! Try again!");
        }

        const data = await response.json();

        if (returns) return data;
        else processData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { sendRequest, error, setError, isLoading, setIsLoading };
};

export default useHttp;
