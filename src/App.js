import { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.com/react-tours-project'


function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // removeTour
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  // fetching tours
  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(true);
      setTours(tours)
      
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTours()
  },[])

  if(loading) (
    <main>
      <Loading/>
    </main>
  )

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' 
            onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <div className="App">
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </div>
  );
}

export default App;
