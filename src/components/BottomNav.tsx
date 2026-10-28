import { Link, useLocation } from 'react-router-dom';

import feedIcon from '../assets/feed.jpg';
import feedIconActive from '../assets/hover-feed.jpg';
import addIcon from '../assets/add.jpg';
import gridIcon from '../assets/grid.jpg';
import gridIconActive from '../assets/hover-grid.jpg';

const ICONS = {
  feed: { normal: feedIcon, active: feedIconActive },
  add: { normal: addIcon, active: addIcon },
  grid: { normal: gridIcon, active: gridIconActive },
};

interface NavIconProps {
  name: keyof typeof ICONS;
  alt: string;
  active?: boolean;
}

const NavIcon = ({ name, alt, active }: NavIconProps) => (
  <img src={active ? ICONS[name].active : ICONS[name].normal} alt={alt} />
);

export const BottomNav = () => {
  const { pathname } = useLocation();
  const feedActive = pathname.startsWith('/risk_factors_feed');
  const gridActive = pathname.startsWith('/risk_factors_grid');

  return (
    <nav className="bottom-nav">
      <Link to="/risk_factors_feed/1" className={`nav-item ${feedActive ? 'active' : ''}`}>
        <NavIcon name="feed" alt="Лента" active={feedActive} />
        <span>Лента</span>
      </Link>

      {/* Добавление — недоступно */}
      <div className="nav-item disabled" aria-disabled="true">
        <NavIcon name="add" alt="Добавить" />
        <span>Добавить</span>
      </div>

      <Link to="/risk_factors_grid" className={`nav-item ${gridActive ? 'active' : ''}`}>
        <NavIcon name="grid" alt="Плитка" active={gridActive} />
        <span>Плитка</span>
      </Link>

      {/* Вход — недоступен */}
      <div className="nav-item disabled" aria-disabled="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="#00ABAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
        </svg>
        <span>Вход</span>
      </div>
    </nav>
  );
};