import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloud,faCloudRain,faCloudSun} from '@fortawesome/free-solid-svg-icons';


function Weather({weather}) {
    const newDate = new Date()
    const day = newDate.getDay()
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[day]
   
    const temperature = ((weather.list[0].main.temp)-273.15).toFixed(0)
    // <FontAwesomeIcon icon={faCloudRain} style={{color: "#0a111f",}} />
  return (
    <>

    <main className="flex gap-10  flex-wrap items-center justify-center ">
  
    <div className="bg-[#D3D3D3] bg-opacity-70 w-80 h-56 p-6 rounded-3xl">
      <h1 className='text-2xl'>{weather.city.name}, {weather.city.country}</h1>
      <h1>{dayName} {(weather.list[0].dt_txt)}</h1>
      <div className="image1">
        <img src="" alt="" />
      <div className="temshow mt-1">
      <h1 className='text-7xl'>{temperature < 23 ?<FontAwesomeIcon icon={faCloudRain} style={{color: "#0a111f",}} /> : temperature < 33 ? <FontAwesomeIcon icon={faCloud} style={{color: "#0a111f",}} /> : <FontAwesomeIcon icon={faCloudSun} style={{color: "#0a111f",}} /> } {((weather.list[0].main.temp)-273.15).toFixed(0)}°C</h1>
      <h1 className='text-lg'>{weather.list[0].weather[0].description}</h1>
      </div>
     
      </div>
    </div>
    <div className='bg-[#D3D3D3] bg-opacity-70 w-80 h-56 p-8 rounded-3xl grid grid gap-4'>
     <div className="flex gap-28 ml-2">
     <div >
        <h1 className='text-lg '> {weather.list[0].wind.speed}mph</h1>
        <p>Wind</p>
     </div>
     <div>
        <h1 className='text-lg'>{weather.list[0].main.humidity}</h1>
        <p>Humidity</p>
     </div>
     </div>
     <div className="flex gap-28 ml-2">
     <div>
        <h1 className='text-lg'>{weather.list[0].main.pressure}</h1>
        <p>Pressure</p>
     </div>
     <div className='mr-4'>
        <h1 className='text-lg'>{((weather.list[0].main.temp_max)-273.15).toFixed(0)}°C</h1>
        <p>High</p>
     </div>
     </div>
    </div>
  </main>

  

  </>
  )
}

export default Weather;