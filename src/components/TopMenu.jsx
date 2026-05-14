import React, {useState, useEffect, use} from "react";
import { formatDate } from "../utils/fomatDate";
import {io} from "socket.io-client";
import { IoShieldSharp } from "react-icons/io5";
import { LuClock9 } from "react-icons/lu";

const formatHeaderDate = (date) => {
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
const socket = io();

const TopMenu = () => {
    const [sessions, setSessions] = useState(0);
    const [date, setNowDate] = useState(new Date());
    useEffect(() => {
        socket.on('activeSessions', (activeSessions) => {
            setSessions(activeSessions);
        });

        const timer = setInterval(() => {
            setNowDate(new Date());
        }, 1000);
        return () => {
          socket.off('activeSessions');
          clearInterval(timer);
        }
    }, []);

    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'long' });
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return (
        <header className="header">
        <div className='header__block'>
          <div className="header__logo">
            <IoShieldSharp className="header__logo-icon"/>
            <h1>INVENTORY</h1></div>
          <div className="header__search">
            <input type="text" placeholder="Поиск" className="header__search-input" />
          </div>
        </div>
        

        <div className="header__date">
          <p className="header__date-day">{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}</p>
          <div className="header__time-block">
              <strong>{formatHeaderDate(date)}</strong>
              <span><LuClock9 className="clock"/>{time}</span>
          </div>
          <div className="header__info-item">
            <span className="header__info-label">Активных сессий: </span>
            <span className="header__info-value">{sessions}</span>
          </div>
        </div>
      </header>
    )
}

export default TopMenu;