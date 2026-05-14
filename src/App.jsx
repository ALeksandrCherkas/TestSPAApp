import logo from './logo.svg';
import './styles/main.scss';
import img from './alien.avif';
import { Route, Navigate, NavLink, Routes } from 'react-router-dom';
import Products from './pages/Products';
import TopMenu from './components/TopMenu';
import Orders from './pages/Orders';
import { BsFillGearFill } from "react-icons/bs";


function App() {
  return (
    <div className='wrapper'>
      <TopMenu />

      <aside className="sidebar">
        <div className="sidebar__profile">
          <img src={img} alt="Avatar" className="sidebar__avatar" />
          <div className="sidebar__icon"><span><BsFillGearFill /></span></div>
        </div>
        <nav className="sidebar__nav">
          <NavLink to="/orders" >ПРИХОД</NavLink>
          <a href="#groups">ГРУППЫ</a>
          <NavLink to="/products" >ПРОДУКТЫ</NavLink>
          <a href="#users">ПОЛЬЗОВАТЕЛИ</a>
          <a href="#settings">НАСТРОЙКИ</a>
        </nav>
      </aside>

      <section className="content">
        <Routes>
          <Route path='/products' element={<Products />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </section>
      

    </div>
  );
}

export default App;
