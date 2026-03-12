import './App.css'
import Xp_bar from './Xp_bar.jsx'

function App() {
  const props = {
    XP : 500,
    Level : 1,
    Gain : 15
  }
  return (
    <>
      <Xp_bar {...props}/>
    </>
  )
}

export default App
