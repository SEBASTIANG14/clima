import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { getUser, logoutUser } from '../../utils/auth';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/login');
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#34c759" />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.info}>✉️ {user?.email}</Text>
        <Text style={styles.info}>📱 Sin número registrado</Text>

        <View style={{ marginTop: 20, width: '100%' }}>
          <Button title="Cerrar sesión" onPress={handleLogout} color="#ff3b30" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
