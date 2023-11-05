"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { getWeatherBySearch } from '@/api/current_weather'

export default function Home() {

  
  useEffect(() => {

    const weather = getWeatherBySearch("pondicherry")

    console.log(weather);


  }, [])

  return (
    <main >
      <div>
        <div className='flex justify-center items-center mt-10'>
          <div className=' backdrop-blur-xl flex  items-center gap-5 bg-dull_grey w-1/2 p-2 rounded-full shadow-white'>
            <img src="/icons/search.png" alt="search" className='w-4 ml-3' />
            <input placeholder='Search city, country' type="text" name="search" id="search" className='w-full bg-transparent outline-none border-none text-grey' />
          </div>
        </div>
        <div className='w-11/12 flex items-center justify-center gap-5 mt-16 m-auto'>
          <div className='backdrop-blur-xl bg-dull_grey w-1/4 h-96 rounded-3xl'>
            <h2 className='text-center text-gold md:text-4xl 2xl:text-5xl font-medium mt-10'>Chennai</h2>
            <div className='mt-16'>
              <div className='flex items-end justify-center'>
                <h2 className='md:text-6xl 2xl:text-8xl font-medium'>09:15</h2>
                <p className='text-xl'>am</p>
              </div>
              <p className='text-center text-neutral-400 md:text-lg 2xl:text-2xl'>Saturday, 05 Nov</p>
            </div>

          </div>
          <div className='backdrop-blur-xl bg-dull_grey w-3/4 h-96 rounded-3xl'>

          </div>
        </div>
        <div className='backdrop-blur-xl w-11/12 h-96 bg-dull_grey mt-6 m-auto rounded-3xl  '>

        </div>
      </div>
    </main>
  )
}
