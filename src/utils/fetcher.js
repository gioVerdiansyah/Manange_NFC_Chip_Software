import PT from "./PropType.js";

const fetcher = async (url, options) => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", process.env.REACT_APP_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  if (options?.headers) {
    const headers = options.headers;
    for (const [key, value] of Object.entries(headers)) {
      myHeaders.append(key, value);
    }
  }

  const requestOptions = {
    ...options,
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    console.log(response)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

fetcher.propTypes = {
  url: PT.string.isRequired,
  options: PT.shape({
    method: PT.string,
    headers: PT.object,
    body: PT.any,
  }),
};

export default fetcher;
