import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import trophy from '../assets/trophy.png'; 

import TextPressure from '../TextPressure/TextPressure'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-xl font-bold tracking-wide hover:text-yellow-300">
              <div style={{position: 'relative', width: '200px'}}>
          <TextPressure
            text="CompTracker"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavLink to="/competitions" className={({ isActive }) => isActive ? 'font-bold text-yellow-400 underline' : 'hover:text-yellow-200'}>
              Competitions
            </NavLink>
            <NavLink to="/participants" className={({ isActive }) => isActive ? 'font-bold text-yellow-400 underline' : 'hover:text-yellow-200'}>
              Participants
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'font-bold text-yellow-400 underline' : 'hover:text-yellow-200'}>
              Leaderboard
            </NavLink>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col mt-2 space-y-2 pb-4">
            <NavLink to="/competitions" className="hover:text-yellow-200 px-2" onClick={() => setMenuOpen(false)}>
              Competitions
            </NavLink>
            <NavLink to="/participants" className="hover:text-yellow-200 px-2" onClick={() => setMenuOpen(false)}>
              Participants
            </NavLink>
            <NavLink to="/leaderboard" className="hover:text-yellow-200 px-2" onClick={() => setMenuOpen(false)}>
              Leaderboard
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
