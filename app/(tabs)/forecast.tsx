import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface Item { date: string; temp: string; }

const mockForecast = (): Item[] => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(Date.now() + i * 86400000).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
    const tempVal = (24 + Math.random() * 6).toFixed(1) + '°C';
    return { date, temp: tempVal };
  });
};

export default function ForecastScreen() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockForecast());
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#ff9500" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico Semanal</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemDate}>{item.date}</Text>
            <Text style={styles.itemTemp}>{item.temp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#ff9500',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemDate: {
    fontSize: 16,
    color: '#333',
  },
  itemTemp: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff9500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});