import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

function App() {
  const [city, setCity] = useState("Rockville")
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
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="Rockville">Rockville</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        
        <div>
          <h1>Farenheit: {JSON.stringify(data.current.temp_f)}</h1>
          <h1>Celsius: {JSON.stringify(data.current.temp_c)}</h1>
        </div>

      </>  
   
  )
}


export default App