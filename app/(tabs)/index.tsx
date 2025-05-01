import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Datos fijos para Mazatlán
const mockCurrent = () => ({
  temp: '27.5',
  description: 'cielo medianamente nublado',
  humidity: '69%',
});

export default function CurrentWeatherScreen() {
  const [data, setData] = useState<{temp:string,description:string,humidity:string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockCurrent());
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#007aff" />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.city}>Tuxlta, CHI</Text>
        <Text style={styles.temp}>{data?.temp}°C</Text>
        <Text style={styles.description}>{data?.description}</Text>
        {data && <Text style={styles.humidity}>💧 {data.humidity}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
    maxWidth: 350,
  },
  city: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#007aff',
  },
  temp: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 8,
    color: '#555',
    textTransform: 'capitalize',
  },
  humidity: {
    fontSize: 16,
    color: '#777',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});