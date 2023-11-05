import { axiosInstance } from './api.instance'




export const getWeatherBySearch = async (query: string): Promise<any> => {
    try {
        const weather = await axiosInstance.get(`/current.json?q=${query}`, {
            headers: {
                key: process.env.NEXT_PUBLIC_WEATHER_API_KEY
            }
        })
        return weather.data;
    } catch (error) {
        return error
    }
}
