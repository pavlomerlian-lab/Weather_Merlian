import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Image, ScrollView, SafeAreaView
} from 'react-native';

const API_KEY = '7d5807736284989e9bd01d371ebee7f8';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError('Місто не знайдено. Спробуйте ще раз.');
      }
    } catch (e) {
      setError('Помилка підключення до інтернету.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🌤️ Погода</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Введіть місто..."
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
          />
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={styles.buttonText}>Пошук</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 40 }} />}

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {weather && (
          <View style={styles.card}>
            <Text style={styles.cityName}>
              {weather.name}, {weather.sys.country}
            </Text>

            <Image
              style={styles.icon}
              source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
            />

            <Text style={styles.description}>
              {weather.weather[0].description}
            </Text>

            <Text style={styles.temp}>
              {Math.round(weather.main.temp)}°C
            </Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>💧 Вологість</Text>
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>💨 Вітер</Text>
                <Text style={styles.detailValue}>{weather.wind.speed} м/с</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>🌡️ Відчувається</Text>
                <Text style={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
    marginBottom: 30,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#16213e',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
