export const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    exp: Date.now() + 60 * 60 * 1000,
  };

  return btoa(JSON.stringify(payload));
};

export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};