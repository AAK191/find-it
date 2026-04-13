export interface User {
  id: string;
  name: string;
  email: string;
}

export function getToken(): string | null {
  return localStorage.getItem("findit_token");
}

export function setToken(token: string): void {
  localStorage.setItem("findit_token", token);
}

export function getUser(): User | null {
  const raw = localStorage.getItem("findit_user");
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user: User): void {
  localStorage.setItem("findit_user", JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem("findit_token");
  localStorage.removeItem("findit_user");
  window.location.href = "/login";
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
