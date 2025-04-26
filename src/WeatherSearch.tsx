import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
//import axios from "axios"

function WeatherSearch() {
  const [city, setCity] = useState<string>("Rockville")
  const [userInput, setUserInput] = useState("")


  


  const {data, isPending, error} = useQuery({
    queryKey: ['city', city],
    queryFn: () => {
      console.log(data)
      return (fetch(`https://api.weatherapi.com/v1/current.json?key=0825d4368ba74de98e6210449251104&q=${city}&aqi=yes`)
      .then(res=>res.json()))
    }
  })



  if (isPending) return <div>Loading</div>

  if (error) return 'An error has occurred: ' + error.message

  return (
    
      <>
        <form onSubmit={() => setCity(userInput)} >
          <input type="search"
          placeholder="Enter a City"
          onChange={(e) => setUserInput(e.target.value)} value={userInput} />
          <button type ="submit">Submit</button>
        </form>
      
        <div>
          <h1>Farenheit: {JSON.stringify(data.current.temp_f)}</h1>
          <h1>Celsius: {JSON.stringify(data.current.temp_c)}</h1>
        </div>

      </>  
   
  )
}


export default WeatherSearch