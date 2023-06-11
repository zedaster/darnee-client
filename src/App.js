import 'bootstrap/dist/css/bootstrap.min.css';
// import bootstrap from 'bootstrap'
import Header from "./components/Header";
import HomePage from "./pages/home/HomePage";
import './assets/css/App.css'

function App() {
  return (
      <div className="app">
          <div className="header-wrapper">
              <Header />
          </div>
          <div className="container app-content">
              <HomePage />
          </div>
      </div>
  );
}

export default App;
