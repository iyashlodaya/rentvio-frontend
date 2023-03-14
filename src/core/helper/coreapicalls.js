import API from "../../backend";

export const getCategories = async () => {
    try {
      const response = await fetch(`${API}/categories`, {
        method: "GET",
      });
      return await response.json();
    } catch (err) {
      console.log("ERROR" + err);
    }
  };