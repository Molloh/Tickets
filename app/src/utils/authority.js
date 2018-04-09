// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return sessionStorage.getItem('authority') || 'guest';
}

export function setAuthority(authority) {
  return sessionStorage.setItem('authority', authority);
}
