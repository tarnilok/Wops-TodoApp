export const ApiHandler = async (url, data, method) => {
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  