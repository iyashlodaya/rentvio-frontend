import { API } from "../../backend";

export const signup = async (requestData) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (response){
      return await response.json();
    }
  } catch (err) {
    // console.log("ERROR" + err);
    return {err: "Failed to save user!"};
  }
};

export const signInWithGoogle = async (token) => {
  const req = {
    credential: token
  }
  try {
    const response = await fetch(`${API}/google/signin`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });

    if(response) {
      return await response.json();
    }    
  } catch (error) {
    // console.log('Error in API', error);
    return {error: "failed to login"}
  }
}

export const signin = async (user) => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if(response) {
      return await response.json();
    }
  } catch (err) {
    // console.log("ERROR" + err);
    return {err: "failed to login"}
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    try {
      await fetch(`${API}/signout`, { method: "GET" });
      return true;
    } catch (err) {
      // console.log("error signin out", err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
