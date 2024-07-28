import './App.css';
import MainContent from './Components/Layout/MainContent';
import BillsPage from './Components/Pages/BillsPage';
import CartList from './Components/Pages/CartList';
import HomePage from './Components/Pages/HomePage';
import ItemsPage from './Components/Pages/ItemsPage';
import CreateUser from './Components/PagesRedux/CreateUser';
import Edit from './Components/PagesRedux/Edit';
import Read from './Components/PagesRedux/Read';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
   
    <Routes>
        {/* <Route path="/Read" element={<Read />}/>
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/Edit/:id" element={<Edit />} /> */}
        <Route path='/main' element={<MainContent/>} />
        <Route path='/' element={<HomePage/>} />
        <Route path='/CartList' element={<CartList/>} />
        <Route path='/ItemsPage' element={<ItemsPage/>} />
        <Route path='/CustomersPage' element={<BillsPage/>} />

      </Routes>
  );
}

export default App;
