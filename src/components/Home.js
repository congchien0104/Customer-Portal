import { useState } from 'react';
import '../style.css';
import SearchTicket from './SearchTicket';
function Home() {

  const [swap, setSwap] = useState(true);

  return (
    <section id="home">
      { 
        swap ? <SearchTicket /> : "cong chien"
      }
    </section>
  )
}

export default Home;