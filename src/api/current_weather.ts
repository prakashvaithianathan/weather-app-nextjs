import { axiosInstance } from './api.instance'




export const getWeatherBySearch = async (query: string, days: number): Promise<any> => {
    try {
        const weather = await axiosInstance.get(`/forecast.json?q=${query}&days=${days}`, {
            headers: {
                key: process.env.NEXT_PUBLIC_WEATHER_API_KEY
            }
        })
        return weather.data;
    } catch (error) {
        return error
    }
}
