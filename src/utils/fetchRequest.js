import { getAuth, getIdToken, signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

export const SOCKET_BASE_URL = "api.ecoquest.app";
export const API_BASE_URL = "https://api.ecoquest.app/";
//"http://localhost:4000/";
// "http://40.127.12.5:4000/";
// "http://40.127.12.5:3000/"; //change for deployment

export const logOutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  localStorage.removeItem("activeLeagueId");
  localStorage.removeItem("activeLeagueName");
  localStorage.removeItem("buildData");
  localStorage.removeItem("gameInitMap");
  localStorage.removeItem("user");
  localStorage.removeItem("userData");
  localStorage.removeItem("email");
  // toast.error("Session expired. Please login again");
  // window.location.href = "/";
};

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token); // Use a generic to specify the expected shape of the decoded token

    if (typeof decodedToken.exp === "number") {
      const currentTime = Date.now() / 1000; // Convert current time to seconds
      const isTokenExpired = decodedToken.exp < currentTime;
      return isTokenExpired;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  // Assume token is expired if there's an error or 'exp' is not a number
  return true;
}

export const fetchImplementation = async (method, path, params, headers) => {
  const searchParams =
    method === "get" || method === "delete"
      ? `?${new URLSearchParams(params)}`
      : "";

  const { currentUser } = getAuth();
  //   localStorage.setItem(
  //     'token',
  //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWNvcXVlc3QtOWI4ZmEiLCJhdWQiOiJlY29xdWVzdC05YjhmYSIsImF1dGhfdGltZSI6MTczMjg5OTAzMCwidXNlcl9pZCI6InpkNXRMRGUwRElSb0FCWTQybWhIRnJOd0xXMTMiLCJzdWIiOiJ6ZDV0TERlMERJUm9BQlk0Mm1oSEZyTndMVzEzIiwiaWF0IjoxNzMyODk5MDMwLCJleHAiOjE3MzI5MDI2MzAsImVtYWlsIjoia2FtcmFuLmF6YW1AaG90YWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrYW1yYW4uYXphbUBob3RhaWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.a2mEJQdO8FY8tEVYInP-cMu3Zb8F7zv0bnQs-5C1IP6SNbvFG5CkzexgQgJM4xHJq4LCEWQ50sG_nNqGErJvRpbQfqjqvSWg40ko5caVR5LIMYRDs5LcTfjmbtAYNI3iuYTRcY3ucNO-Lq6FdIU2S_jchEHlbO43TZdXfCRjn7aHzKD_XThuFW-nTKqmGAPmc-0q56IF8I57mYHv4FzcSsVQQA3OvbSDqo7_sK1o_MkGSdXJI2iEmWBGFXQhUXH4tp_BOeO6yRu0tuCUlnO_1_PJJysuk_p-8zOvja_z8eR83Lt0agR1qPO7oDQYNdiylvuexxK8T9_A3W_6bBSOqA'
  //   );
  let token = localStorage.getItem("token") || "";

  if (currentUser && isTokenExpired(token)) {
    token = await getIdToken(currentUser, true);
    localStorage.setItem("token", token);
  }
  // else if (!currentUser && isTokenExpired(token)) {
  //   logOutUser();
  // }

  if (token && localStorage.getItem("token") !== token) {
    localStorage.setItem("token", token);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}${searchParams}`, {
      method: method.toUpperCase(),
      credentials: "include",
      //   referrerPolicy: 'no-referrer', // or 'origin' or 'strict-origin-when-cross-origin'
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method === "get" ? undefined : JSON.stringify(params),
    });

    // Todo: original impl had an option to return response.text() depending on the contents of 'jsonEndpoints'
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(error?.message || "Error fetching data");
  }
};
