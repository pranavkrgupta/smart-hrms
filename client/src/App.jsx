import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;
