import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Homepage from './page/homepage/Homepage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
