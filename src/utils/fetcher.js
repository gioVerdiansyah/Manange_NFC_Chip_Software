// utils/fetcher.js
import PT from "./PropType"

const fetcher = async (url, options = {}) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'x-api-key': 'your-api-key-value', // Ganti dengan nilai API key yang sesuai
      ...options.headers, // Izinkan penggantian atau penambahan header tambahan
    };
  
    const requestOptions = {
      ...options,
      headers: defaultHeaders,
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
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
