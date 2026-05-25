import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const normalizedRole = role?.toLowerCase();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link" onClick={handleNavClick}>FitTrack</Link>
      </div>
      <div className="nav-menu">
        <Link to="/">Home</Link>
        {token && <Link to={normalizedRole === 'admin' ? '/admin' : normalizedRole === 'trainer' ? '/trainer' : '/dashboard'}>Dashboard</Link>}
        {token && <Link to="/workouts">Workouts</Link>}
        {token && normalizedRole !== 'trainer' && <Link to="/membership">Membership</Link>}
        {token && <Link to="/profile">Profile</Link>}
      </div>
      <div className="nav-actions">
        {token ? (
          <button className="nav-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button nav-button-secondary">Register</Link>
          </>
        )}
      </div>
      <button 
        className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={handleNavClick}>Home</Link>
        {token && <Link to={normalizedRole === 'admin' ? '/admin' : normalizedRole === 'trainer' ? '/trainer' : '/dashboard'} onClick={handleNavClick}>Dashboard</Link>}
        {token && <Link to="/workouts" onClick={handleNavClick}>Workouts</Link>}
        {token && normalizedRole !== 'trainer' && <Link to="/membership" onClick={handleNavClick}>Membership</Link>}
        {token && <Link to="/profile" onClick={handleNavClick}>Profile</Link>}
        {token ? (
          <button className="mobile-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={handleNavClick}>Login</Link>
            <Link to="/register" onClick={handleNavClick}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
