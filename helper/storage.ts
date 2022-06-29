export const setStorage = (name: string, value: any) => {
  localStorage.setItem(name, value);
}

export const getStorage = (name: string) => {
  return localStorage.getItem(name);
}

export const removeStorage = (name: string) => {
  return localStorage.removeItem(name);
}
