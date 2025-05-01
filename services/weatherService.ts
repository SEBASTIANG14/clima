const API_KEY = '553e3ef57148f9f8b255f8260739aa8a'; // sin espacios ni errores
const BASE = 'https://api.openweathermap.org/data/2.5';

interface CurrentData {
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  coord: { lat: number; lon: number };
}

interface OneCallDaily {
  dt: number;
  temp: { day: number };
  weather: { description: string }[];
}

interface OneCallResponse {
  daily: OneCallDaily[];
}

export async function fetchCurrentWeather(city: string): Promise<CurrentData> {
  const res = await fetch(
    `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=es`
  );
  if (!res.ok) throw new Error('Error al obtener clima actual');
  return res.json();
}

export async function fetch15DayForecast(city: string): Promise<{ date: string; temp: number; description: string }[]> {
  // Obtener coordenadas
  const geo = await fetchCurrentWeather(city);
  console.log('Datos del clima actual:', geo);
  const { lon, lat } = geo.coord || {};
  if (!lon || !lat) throw new Error('Coordenadas no disponibles para esta ciudad.');

  const res = await fetch(`${BASE}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}&lang=es`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error en /onecall:', errorText);
    throw new Error('Error al obtener pronóstico');
  }

  const data: OneCallResponse = await res.json();

  return data.daily.slice(0, 7).map((d) => ({
    date: new Date(d.dt * 1000).toISOString().split('T')[0],
    temp: d.temp.day,
    description: d.weather[0].description,
  }));
}
