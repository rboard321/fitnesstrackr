const { REACT_APP_API_URL = `https://fitnesstrac-kr.herokuapp.com/api` } =
  process.env;

export const callApi = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    options["authorizaation"] = `Bearer ${token}`;
    const response = await fetch(`${REACT_APP_BASE_URL}${url}`, options);
    const data = await response.json();
    if (data.error) {
      throw data.error;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
