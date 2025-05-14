import * as SecureStore from 'expo-secure-store';

export async function saveUser(user: { name: string; email: string; password: string }) {
  await SecureStore.setItemAsync('user', JSON.stringify(user));
}

export async function getUser() {
  const data = await SecureStore.getItemAsync('user');
  return data ? JSON.parse(data) : null;
}

export async function loginUser(email: string, password: string) {
  const user = await getUser();
  if (!user) return null;
  if (user.email === email && user.password === password) return user;
  return null;
}

export async function logoutUser() {
  await SecureStore.deleteItemAsync('user');
}
