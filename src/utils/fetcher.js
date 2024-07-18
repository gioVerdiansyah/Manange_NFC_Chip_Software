

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
    if (response.status === 401) localStorage.removeItem(process.env.REACT_APP_COOKIE_NAME);
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetcher;
