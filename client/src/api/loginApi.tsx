export const loginRequest = async (username: string, password: string) => {
  const res = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};
