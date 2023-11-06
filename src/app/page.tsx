"use client"

import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { getWeatherBySearch } from '@/api/current_weather'
import moment from "moment-timezone"
import Input from '@/components/Input'


interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  forecast: {
    forecastday: [
      {
        date: string,
        day: {
          condition: {
            text: string;
            icon: string;
            code: number;
          },
          avgtemp_c: string
        },
        astro: object,
        hour: [
          {
            condition: {
              text: string;
              icon: string;
              code: number
            },
            time: string,
            temp_c: number,
            is_day: number
          }
        ]
      }
    ];
  };
}


interface timeData {
  time: string;
  meridiem: string;
  dayAndDate: string
}

export default function Home() {

  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: '',
    },
    current: {
      last_updated_epoch: 0,
      last_updated: '',
      temp_c: 0,
      temp_f: 0,
      is_day: 0,
      condition: {
        text: '',
        icon: '',
        code: 0,
      },
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: '',
      pressure_mb: 0,
      pressure_in: 0,
      precip_mm: 0,
      precip_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      vis_km: 0,
      vis_miles: 0,
      uv: 0,
      gust_mph: 0,
      gust_kph: 0,
    },
    forecast: {
      forecastday: [
        {
          date: "",
          day: {
            condition: {
              text: '',
              icon: '',
              code: 0,
            },
            avgtemp_c: ""
          },
          astro: {},
          hour: [
            {
              condition: {
                text: "",
                icon: "",
                code: 0
              },
              time: "",
              temp_c: 0,
              is_day: 0
            }
          ]
        }
      ]
    }
  })

  const [timeData, setTimeData] = useState<timeData>({
    time: "",
    meridiem: "",
    dayAndDate: ""
  })


  const [searchData, setSearchData] = useState<string>("")

  const getWeather = (timeZoneData: string) => {

    const timeZone = timeZoneData

    // Convert the epoch time to a specific time format in the given timezone
    const formattedTime = moment.tz(timeZone).format('hh:mm A');
    // Get the day of the week and date in the desired format
    const dayAndDate = moment.tz(timeZone).format('dddd, DD MMM');

    // Extract the time in "hh:mm" and "am" or "pm" separately
    const [time, amOrPm] = formattedTime.split(' ');

    setTimeData({
      time: time,
      meridiem: amOrPm.toLocaleLowerCase(),
      dayAndDate: dayAndDate
    })
  }


  const weatherDataService = async (searchQuery: string, days: number) => {
    try {
      const getWeatherData = await getWeatherBySearch(searchQuery, days)
      setInterval(() => {
        getWeather(getWeatherData.location.tz_id)
      }, 1000);
      setWeatherData(getWeatherData)
    } catch (error) {

    }
  }



  const getDayfromDate = (date: string) => {
    const inputDate = date;
    const inputTimezone = 'UTC'; // Change this to your preferred timezone

    // Parse the input date and set the desired output format
    const formattedDate = moment.tz(inputDate, inputTimezone).format('dddd, DD MMM');
    return formattedDate
  }

  const getTimefromDate = (date: string) => {
    const inputDate = date
    const formattedDate = moment(inputDate).format('dddd, DD MMM - hh:mm A');

    return formattedDate
  }

  useEffect(() => {
    weatherDataService("pondicherry", 14)
  }, [])



  const handleEnterKeyPress = async () => {
    const intervalId = await weatherDataService(searchData, 14)
    // if (intervalId) {
    //   clearInterval(intervalId);
    // }
    // console.log(intervalId);

  }



  return (
    <main >
      <div>
        <div className='flex justify-center items-center mt-10'>
          <div className=' backdrop-blur-xl flex  items-center gap-5 bg-dull_grey/50 w-1/2 p-2 rounded-full shadow-white'>
            <img src="/icons/search.png" alt="search" className='w-4 ml-3' />
            <Input
              placeholder='Search city, country'
              type="text"
              name="search"
              id="search"
              className='bg-transparent outline-none border-none text-grey w-full'
              value={searchData}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchData(e.target.value)}
              onEnter={() => handleEnterKeyPress()}
            />
          </div>
        </div>
        <div className='w-11/12 flex items-center justify-center gap-5 mt-16 m-auto'>
          <div className='backdrop-blur-xl bg-dull_grey/50 w-1/4 h-96 rounded-3xl'>
            <h2 className='text-center text-gold md:text-4xl 2xl:text-5xl font-medium mt-10'>{weatherData.location.name}</h2>
            <div className='mt-16'>
              <div className='flex items-end justify-center'>
                <h2 className='md:text-6xl 2xl:text-8xl font-medium'>{timeData.time}</h2>
                <p className='text-2xl mb-1'>{timeData.meridiem}</p>
              </div>
              <p className='text-center text-neutral-400 md:text-lg 2xl:text-2xl'>{timeData.dayAndDate}</p>
            </div>
          </div>
          <div className='backdrop-blur-xl bg-dull_grey/50 w-3/4 h-96 rounded-3xl flex justify-around items-center p-8'>
            <div>
              <h2 className='2xl:text-8xl md:text-xl font-bold'>{weatherData.current.temp_c}°C</h2>
              <div className=' text-neutral-400 flex items-center justify-center'>
                <p className='text-2xl font-medium'>Feels like: </p>
                <h2 className='text-5xl font-medium'>&nbsp;{weatherData.current.feelslike_c}°C</h2>
              </div>
            </div>
            <div className='w-max'>
              <img src={`/weather_icons/${weatherData.current.is_day ? "day" : "night"}/${weatherData.current.condition.code}.png`} alt="sunny" className='w-1/2 m-auto' />
              <p className='text-center mt-6 font-medium text-5xl'>{weatherData.current.condition.text}</p>
            </div>
            <div className='grid grid-cols-2 items-center gap-12 gap-x-20'>
              <div className='flex flex-col items-center gap-2'>
                <img src="/weather_icons/humidity.png" alt="humidity" />
                <div>
                  <p className='text-2xl font-medium text-center'>{weatherData.current.humidity}%</p>
                  <p className='text-lg font-normal'>Humidity</p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <img src="/weather_icons/wind.png" alt="wind" />
                <div>
                  <p className='text-2xl font-medium text-center'>{weatherData.current.wind_kph}km/h</p>
                  <p className='text-lg font-normal text-center'>Wind</p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <img src="/weather_icons/pressure.png" alt="pressure" />
                <div>
                  <p className='text-2xl font-medium text-center'>{weatherData.current.pressure_in}hPa</p>
                  <p className='text-lg font-normal text-center'>Pressure</p>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <img src="/weather_icons/uv.png" alt="uv" />
                <div>
                  <p className='text-2xl font-medium text-center'>{weatherData.current.uv}</p>
                  <p className='text-lg font-normal text-center'>UV</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-11/12 flex items-center justify-center gap-5 mt-8 m-auto mb-16 relative'>
          <div className='backdrop-blur-xl w-3/4 h-96 bg-dull_grey/50 m-auto rounded-3xl relative'>
            <h2 className='text-center p-2 text-3xl font-medium text-neutral-400'>Day forecast</h2>
            <div className='flex items-center gap-5 mt-8 overflow-x-scroll px-8 horizontalScroll p-2'>
              <div className='flex items-center gap-5'>
                {weatherData.forecast.forecastday.map((item, i) => (
                  <div
                    key={i}
                    className='cursor-pointer flex flex-col items-center rounded-2xl bg-neutral-700/50 w-60 h-60 p-2 border-2 border-neutral-700'
                  >
                    <p className='font-bold text-3xl'>{item.day.avgtemp_c}°C</p>
                    <img
                      src={`/weather_icons/day/${item.day.condition.code}.png`}
                      alt={item.day.condition.text}
                      className='w-24 mt-5'
                    />
                    <p className='mt-2 font-normal text-2xl'>{item.day.condition.text}</p>
                    <p className='text-neutral-400 font-medium'>{getDayfromDate(item.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='backdrop-blur-xl bg-dull_grey/50 w-1/4 h-96 rounded-3xl flex flex-col items-center '>
            <h2 className='text-center pt-4 text-3xl font-medium text-neutral-400 '>Hourly forecast</h2>
            <div className='overflow-y-scroll hideScrollHourly'>
              {
                weatherData.forecast.forecastday[0].hour.map((item, i) => (
                  <div key={i} className='flex items-center justify-start gap-2 rounded-2xl border-neutral-700 bg-neutral-700/50 w-full mt-2 pl-8 p-2'>
                    <div>
                      <img src={`weather_icons/${item.is_day ? "day" : "night"}/${item.condition.code}.png`} alt={item.condition.text} className='w-12' />
                    </div>
                    <div>
                      <p>{item.condition.text}({item.temp_c}°C)</p>
                      <p className='text-sm text-neutral-400'>{getTimefromDate(item.time)}</p>
                    </div>
                  </div>
                ))
              }


            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
