"use client"

import { useEffect, useState, ChangeEvent } from 'react'

import Image from 'next/image'
import { getWeatherBySearch } from '@/api/current_weather'
import moment from "moment-timezone"
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThreeDots } from 'react-loader-spinner'
import { getTimefromDate, getDayfromDate, getWeather } from '@/utils/findData'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
          avgtemp_c: string;
          avghumidity: number;
          daily_chance_of_rain: number;
          daily_chance_of_snow: number;
          maxtemp_c: number;
          maxwind_kph: number;
          uv: number
        },
        astro: {
          moonrise: string,
          moonset: string,
          sunrise: string,
          sunset: string
        },
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

  const router = useRouter()
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
            avgtemp_c: "",
            avghumidity: 0,
            daily_chance_of_rain: 0,
            daily_chance_of_snow: 0,
            maxtemp_c: 0,
            maxwind_kph: 0,
            uv: 0
          },
          astro: {
            moonrise: "",
            moonset: "",
            sunrise: "",
            sunset: ""
          },
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
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(true)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setTimeout> | null>(null);




  useEffect(() => {
    const searchDataFromCookie = Cookies.get('searchData');
    if (searchDataFromCookie) {
      setSearchData(searchDataFromCookie);
      weatherDataService(searchDataFromCookie, 14);
    } else {
      weatherDataService('india', 14);
    }

  }, []);

  const handleEnterKeyPress = async () => {
    // Store the searchData value in a cookie when the Enter key is pressed
    if (searchData === "") {
      toast.error('Enter the City or Country', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    } else {
      Cookies.set('searchData', searchData, { expires: 7 }); // 'expires' sets the cookie expiration in days
      weatherDataService(searchData, 14);
    }

  }

  const weatherDataService = async (searchQuery: string, days: number) => {
    try {
      setIsLoading(true)
      setIsError(false)
      const getWeatherData = await getWeatherBySearch(searchQuery, days)
      if (getWeatherData?.response?.status === 400) {
        setIsError(true)
        Cookies.set('searchData', '', { expires: 7 });
        return
      }

      getWeather(getWeatherData.location.tz_id, setTimeData);
      setWeatherData(getWeatherData)

    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    const newIntervalId = setInterval(() => {
      getWeather(weatherData.location.tz_id, setTimeData);
    }, 1000);
    return () => clearInterval(newIntervalId)
  }, [weatherData])



  return (
    <main >
      <ToastContainer />
      {
        !isLoading ?
          isError ?
            <div className='flex flex-col items-center justify-center h-screen'>
              <h2 className='text-5xl lg:text-8xl font-medium'>Windly</h2>
              <p className='text-neutral-400 text-3xl mt-2 text-center'>500 Internal Server Error, Something went wrong!</p>
              <div onClick={() => {
                window.location.reload();
              }} className='px-6 py-2 cursor-pointer bg-neutral-600 rounded-2xl w-max flex items-center justify-center gap-2 mt-4'>
                <Image width={100} height={100} src="/icons/restart.png" alt='back' className='w-4' />
                <h2 className='text-xl'>Try again</h2>
              </div>
            </div>
            :
            <div>
              <h2 className='relative text-center lg:absolute text-5xl lg:text-4xl lg:left-20 mt-6 lg:mt-0'>Wind.ly</h2>
              <div className='flex justify-center items-center mt-10'>
                <div className=' backdrop-blur-xl flex  items-center gap-5 bg-dull_grey/50 w-max lg:w-1/2 p-2 rounded-full shadow-white'>
                  <Image src="/icons/search.png" alt="search" className='w-4 ml-3' width={100} height={100} />
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
                  <p onClick={handleEnterKeyPress} className='text-neutral-400 cursor-pointer px-4 py-1 bg-dull_grey rounded-2xl text-center'>search</p>
                </div>
              </div>
              <div className='w-11/12 flex flex-col lg:flex-row  items-center justify-center gap-5 mt-16 m-auto'>
                <div className='backdrop-blur-xl bg-dull_grey/50 w-full lg:w-1/4  h-64 lg:h-96 rounded-3xl'>
                  <h2 className='text-center text-gold text-4xl 2xl:text-5xl font-medium mt-10'>{weatherData.location.name}</h2>
                  <div className='mt-8 lg:mt-16'>
                    <div className='flex items-end justify-center'>
                      <h2 className='text-6xl 2xl:text-8xl font-medium'>{timeData.time}</h2>
                      <p className='text-2xl mb-1'>{timeData.meridiem}</p>
                    </div>
                    <p className='text-center text-neutral-400 md:text-lg 2xl:text-2xl'>{timeData.dayAndDate}</p>
                  </div>
                </div>
                <div className='backdrop-blur-xl bg-dull_grey/50 w-full lg:w-3/4 h-max lg:h-96 rounded-3xl flex  flex-col lg:flex-row justify-around items-center p-8'>
                  <div>
                    <h2 className='text-6xl xl:text-6xl 2xl:text-8xl  font-bold text-gold'>{weatherData.current.temp_c}°C</h2>
                    <div className=' text-neutral-400 flex items-center justify-center'>
                      <p className='text-xl lg:text-2xl font-medium'>Feels like: </p>
                      <h2 className='text-2xl lg:text-5xl font-medium'>&nbsp;{weatherData.current.feelslike_c}°C</h2>
                    </div>
                  </div>
                  <div className='w-max flex flex-col items-center'>
                    <Image width={100} height={100} src={`/weather_icons/${weatherData.current.is_day ? "day" : "night"}/${weatherData.current.condition.code}.png`} alt={weatherData.current.condition.text} className='w-1/4 lg:w-1/3 xl:w-1/4  m-auto mt-10 lg:mt-0' />
                    <p className='text-center mt-2  lg:mt-6 font-medium text-3xl lg:text-5xl  w-3/4'>{weatherData.current.condition.text}</p>
                  </div>
                  <div className='grid grid-cols-2 items-center gap-12 gap-x-20 mt-8 lg:mt-0'>
                    <div className='flex flex-col items-center gap-2'>
                      <Image width={100} height={100} src="/weather_icons/humidity.png" alt="humidity" className='w-1/2' />
                      <div>
                        <p className='text-2xl font-medium text-center'>{weatherData.current.humidity}%</p>
                        <p className='text-lg font-normal'>Humidity</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <Image width={100} height={100} src="/weather_icons/wind.png" alt="wind" className='w-1/2 lg:w-14' />
                      <div>
                        <p className='text-2xl font-medium text-center'>{weatherData.current.wind_kph}km/h</p>
                        <p className='text-lg font-normal text-center'>Wind</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <Image width={100} height={100} src="/weather_icons/pressure.png" alt="pressure" className='w-1/2' />
                      <div>
                        <p className='text-2xl font-medium text-center'>{weatherData.current.pressure_in}hPa</p>
                        <p className='text-lg font-normal text-center'>Pressure</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <Image width={100} height={100} src="/weather_icons/uv.png" alt="uv" className='w-1/2' />
                      <div>
                        <p className='text-2xl font-medium text-center'>{weatherData.current.uv}</p>
                        <p className='text-lg font-normal text-center'>UV</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-11/12 flex flex-col lg:flex-row items-center justify-center gap-5 mt-8 m-auto mb-16 relative'>
                <div className='backdrop-blur-xl w-full lg:w-3/4 h-96 bg-dull_grey/50 m-auto rounded-3xl relative'>
                  <h2 className='text-center p-2 text-3xl font-medium text-neutral-400'>Day forecast</h2>
                  <div className='flex items-center gap-5 mt-8 overflow-x-scroll px-8 horizontalScroll p-2'>
                    <div className='flex items-center gap-5'>
                      {weatherData.forecast.forecastday.map((item, i) => (
                        <Link
                          href={{
                            pathname: '/details',
                            query: {
                              search: JSON.stringify({
                                moonrise: item.astro.moonrise,
                                moonset: item.astro.moonset,
                                sunrise: item.astro.sunrise,
                                sunset: item.astro.sunset,
                                date: item.date,
                                day: {
                                  avg_humidity: item.day.avghumidity,
                                  avg_temp: item.day.avgtemp_c,
                                  condition: item.day.condition,
                                  rainChance: item.day.daily_chance_of_rain,
                                  snowChance: item.day.daily_chance_of_snow,
                                  max_temp: item.day.maxtemp_c,
                                  max_wind_kph: item.day.maxwind_kph,
                                  uv: item.day.uv
                                },
                                location: {
                                  place: weatherData.location.name,
                                  timeData: getDayfromDate(item.date)
                                }
                              })
                            }
                          }}
                          key={i}
                        >
                          <div
                            // onClick={() => {
                            //   console.log(item);

                            // }}

                            className='cursor-pointer flex flex-col items-center rounded-2xl bg-neutral-700/50 w-60 h-60 p-2 border-2 border-neutral-700'
                          >
                            <p className='font-bold text-3xl'>{item.day.avgtemp_c}°C</p>
                            <Image
                              width={100}
                              height={100}
                              src={`/weather_icons/day/${item.day.condition.code}.png`}
                              alt={item.day.condition.text}
                              className='w-24 mt-5'
                            />
                            <p className='mt-2 font-normal text-2xl'>{item.day.condition.text}</p>
                            <p className='text-neutral-400 font-medium'>{getDayfromDate(item.date)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='backdrop-blur-xl bg-dull_grey/50 w-full lg:w-1/4 h-96 p-4 lg:p-2  rounded-3xl flex flex-col items-center '>
                  <h2 className='text-center pt-4 text-3xl font-medium text-neutral-400 '>Hourly forecast</h2>
                  <div className='overflow-y-scroll hideScrollHourly'>
                    {
                      weatherData.forecast.forecastday[0].hour.map((item, i) => (
                        <div key={i} className='flex items-center justify-start gap-2 rounded-2xl border-neutral-700 bg-neutral-700/50 w-full mt-2 pl-8 p-2'>
                          <div>
                            <Image width={100} height={100} src={`/weather_icons/${item.is_day ? "day" : "night"}/${item.condition.code}.png`} alt={item.condition.text} className='w-12' />
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
          :
          <div className='flex items-center justify-center h-screen'>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FEC255"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>

      }



    </main>
  )
}
