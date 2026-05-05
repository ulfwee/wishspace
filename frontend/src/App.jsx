import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index'; 

function App() {
  return (
    <BrowserRouter>
      <main>
        <AppRoutes /> 
      </main>
    </BrowserRouter>
  );
}

export default App;
