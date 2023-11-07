"use client"

import React from 'react'

import { useSearchParams } from 'next/navigation'

const Details = () => {
    const searchParams = useSearchParams()
    const getData: string | null = searchParams.get('search')
    let result: any; // Declare the 'result' variable

    if (getData !== null) {
        result = JSON.parse(getData);
        // Now you can work with the parsed JSON data in the 'result' variable.
        console.log(result);
    } else {
        // Handle the case where getData is null
        console.log('getData is null');
    }

    return (
        <div>
            <div className='w-11/12 bg-dull_grey h-max lg:h-screen m-auto rounded-2xl my-10'>
                <div className='w-full text-center pt-5'>
                    <h2 className='text-gold text-5xl font-medium '>{result.location.place}</h2>
                    <p className='text-neutral-400 text-xl mt-2'>{result.location.timeData}</p>
                </div>
                <div className='flex flex-col lg:flex-row justify-between p-12 mt-8 gap-12 '>
                    <div>
                        <h2 className='text-5xl text-gold font-medium text-center'>Astro</h2>
                        <div className='flex items-end justify-between gap-2 mt-5'>
                            <h2 className='text-3xl '>Moonrise:</h2>
                            <p className='text-xl text-neutral-300'>{result.moonrise}</p>
                        </div>
                        <div className='flex items-end justify-between gap-2 mt-5'>
                            <h2 className='text-3xl '>Moonset:</h2>
                            <p className='text-xl text-neutral-300'>{result.moonset}</p>
                        </div>
                        <div className='flex items-end justify-between gap-2 mt-5'>
                            <h2 className='text-3xl '>Sunrise:</h2>
                            <p className='text-xl text-neutral-300'>{result.sunrise}</p>
                        </div>
                        <div className='flex items-end justify-between gap-2 mt-5'>
                            <h2 className='text-3xl '>Sunset:</h2>
                            <p className='text-xl text-neutral-300'>{result.sunset}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-max'>
                        <img src={`/weather_icons/day/${result.day.condition.code}.png`} alt={result.day.condition.text} className='w-1/2 lg:w-2/4' />
                        <h2 className='text-center mt-2 text-3xl lg:text-5xl font-medium'>{result.day.condition.text}</h2>
                    </div>
                    <div>

                        <div className='grid grid-cols-2 lg:grid-cols-3 items-center gap-12 gap-x-20'>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/humidity.png" alt="humidity" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.avg_humidity}%</p>
                                    <p className='text-lg font-normal'>Humidity</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/wind.png" alt="wind" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.max_wind_kph}km/h</p>
                                    <p className='text-lg font-normal text-center'>Wind</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/pressure.png" alt="pressure" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{ }hPa</p>
                                    <p className='text-lg font-normal text-center'>Pressure</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/uv.png" alt="uv" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.uv}</p>
                                    <p className='text-lg font-normal text-center'>UV</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/temperature.png" alt="temperature" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.avg_temp}°C</p>
                                    <p className='text-lg font-normal text-center'>Average Temperature</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/temperature.png" alt="temperature" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.max_temp}°C</p>
                                    <p className='text-lg font-normal text-center'>Max. Temperature</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/rain.png" alt="rain" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.rainChance}%</p>
                                    <p className='text-lg font-normal text-center'>Chances of Rain</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <img src="/weather_icons/snow.png" alt="snow" className='w-20' />
                                <div>
                                    <p className='text-2xl font-medium text-center'>{result.day.snowChance}%</p>
                                    <p className='text-lg font-normal text-center'>Chances of Snow</p>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details