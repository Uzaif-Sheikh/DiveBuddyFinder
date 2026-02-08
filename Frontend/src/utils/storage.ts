import { userState } from "../store/UserReducer";

export const loadUser = (): userState | null => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const saveUser = (user: userState | null) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

export const clearUser = () => {
	localStorage.removeItem("user");
}
