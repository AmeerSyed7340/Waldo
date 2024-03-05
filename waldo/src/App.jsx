import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/game' element={<GamePage/>}/>
      </Routes>
    </div>    
  )
}

export default App
