import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';
import LeaderboardPage from './components/LeaderboardPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/game' element={<GamePage/>}/>
        <Route path='/leaderboard' element={<LeaderboardPage/>}/>
      </Routes>
    </div>    
  )
}

export default App
