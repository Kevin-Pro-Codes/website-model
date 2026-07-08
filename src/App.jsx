import { useState } from 'react';
import { 
  Menu, X, ChevronRight, RefreshCw, Search, User, Bell, Home, 
  Info, Briefcase, Mail, Plus, Image
} from 'lucide-react';

// Navbar Component with Tailwind (same as before)
function Navbar({ type, extraButtons = [] }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Core navigation items that are ALWAYS visible (at least one)
  const coreNavItems = [
    { id: 1, label: 'Home', href: '#', icon: <Home className="w-4 h-4" /> },
    { id: 2, label: 'About', href: '#', icon: <Info className="w-4 h-4" /> },
    { id: 3, label: 'Services', href: '#', icon: <Briefcase className="w-4 h-4" /> },
    { id: 4, label: 'Contact', href: '#', icon: <Mail className="w-4 h-4" /> },
  ];

  const availableExtraButtons = [
    { id: 'logo', label: 'Logo', icon: <Image className="w-4 h-4" />, color: 'purple', type: 'logo' },
    { id: 'search', label: 'Search', icon: <Search className="w-4 h-4" />, color: 'gray', type: 'icon' },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, color: 'purple', type: 'icon' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, color: 'blue', type: 'icon' },
    { id: 'signup', label: 'Sign Up', icon: <User className="w-4 h-4" />, color: 'gradient', gradient: 'from-blue-500 to-cyan-500', type: 'button' },
  ];

  const MobileMenu = () => (
    <div className="md:hidden mt-4 space-y-2 border-t pt-4">
      {coreNavItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={() => setIsHamburgerOpen(false)}
          className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  );

  const HamburgerButton = ({ onClick, isOpen }) => (
    <button
      onClick={onClick}
      className="p-2 rounded-lg bg-transparent transition-colors group"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-gray-800 group-hover:text-gray-400" />
      ) : (
        <Menu className="w-6 h-6 text-gray-800 group-hover:text-gray-400" />
      )}
    </button>
  );

  const Logo = ({ className = "", showText = true }) => {
    const showLogo = extraButtons.includes('logo');
    
    if (!showLogo) {
      // Return a placeholder div with the same height to maintain consistent navbar height
      return <div className="h-10"></div>;
    }
    
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        {showText && <span className="font-bold text-xl text-gray-800 hidden sm:block">NavDemo</span>}
      </div>
    );
  };

  const ExtraButton = ({ button }) => {
    const btn = availableExtraButtons.find(b => b.id === button);
    if (!btn) return null;

    if (btn.id === 'logo') {
      return <Logo showText={false} />;
    }

    if (btn.color === 'gradient') {
      return (
        <button className={`px-4 py-2 bg-gradient-to-r ${btn.gradient} text-white rounded-lg hover:opacity-90 transition-opacity font-medium`}>
          {btn.label}
        </button>
      );
    }

    return (
      <button className={`p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-800`}>
        {btn.icon}
      </button>
    );
  };

  // Get active extra buttons (excluding logo which is handled separately)
  const activeExtraButtons = extraButtons.filter(btn => btn !== 'logo');

  // Standard navbar height - applied to all navbars
  const navbarHeightClass = "min-h-[64px] py-4";

  // Classic navbar types with responsive design
  switch (type) {
    case 'Left Elements':
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo and Navigation on Left */}
              <div className="flex items-center space-x-6">
                <Logo className="text-gray-800" />
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  {coreNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="text-gray-800 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Right Side - Extra Buttons & Hamburger */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  {activeExtraButtons.map(buttonId => (
                    <ExtraButton key={buttonId} button={buttonId} />
                  ))}
                </div>
                <div className="md:hidden">
                  <HamburgerButton 
                    onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} 
                    isOpen={isHamburgerOpen}
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isHamburgerOpen && (
              <div className="md:hidden mt-4 space-y-2 pt-4 border-t border-gray-300">
                {coreNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsHamburgerOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
                {activeExtraButtons.length > 0 && (
                  <>
                    <div className="pt-4 border-t border-gray-300">
                      <div className="text-xs font-semibold text-gray-600 px-4 mb-2">EXTRA BUTTONS</div>
                      {activeExtraButtons.map(buttonId => {
                        const btn = availableExtraButtons.find(b => b.id === buttonId);
                        return btn ? (
                          <button key={btn.id} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium w-screen">
                            {btn.icon}
                            {btn.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      );

    case 'Right Elements':
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo on Left */}
              <Logo className="text-gray-800" />
              
              {/* Right Side - Navigation and Extra Buttons */}
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation - Now on RIGHT side */}
                <div className="hidden md:flex items-center space-x-6">
                  {coreNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="text-gray-800 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
                
                {/* Extra Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  {activeExtraButtons.map(buttonId => (
                    <ExtraButton key={buttonId} button={buttonId} />
                  ))}
                </div>
                
                {/* Hamburger for Mobile */}
                <div className="md:hidden">
                  <HamburgerButton 
                    onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} 
                    isOpen={isHamburgerOpen}
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isHamburgerOpen && (
              <div className="md:hidden mt-4 space-y-2 pt-4 border-t border-gray-300">
                {coreNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsHamburgerOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
                {activeExtraButtons.length > 0 && (
                  <div className="pt-4 border-t border-gray-300">
                    <div className="text-xs font-semibold text-gray-600 px-4 mb-2">EXTRA BUTTONS</div>
                    {activeExtraButtons.map(buttonId => {
                      const btn = availableExtraButtons.find(b => b.id === buttonId);
                      return btn ? (
                        <button key={btn.id} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium w-screen">
                          {btn.icon}
                          {btn.label}
                        </button>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      );

    case 'Central Elements':
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Left Side */}
              <Logo />
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {coreNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-gray-800 hover:text-purple-600 font-medium transition-colors flex items-center gap-2 whitespace-nowrap group relative"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-screen transition-all duration-300"></span>
                  </a>
                ))}
              </div>
              
              {/* Right Side with Extra Buttons */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  {activeExtraButtons.map(buttonId => (
                    <ExtraButton key={buttonId} button={buttonId} />
                  ))}
                </div>
                <div className="md:hidden">
                  <HamburgerButton 
                    onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} 
                    isOpen={isHamburgerOpen}
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isHamburgerOpen && (
              <>
                <MobileMenu />
                {activeExtraButtons.length > 0 && (
                  <div className="md:hidden mt-4 pt-4 border-t">
                    <div className="text-xs font-semibold text-gray-600 px-4 mb-2">EXTRA BUTTONS</div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeExtraButtons.map(buttonId => {
                        const btn = availableExtraButtons.find(b => b.id === buttonId);
                        return btn ? (
                          <button key={btn.id} className="flex items-center gap-2 p-3 text-gray-800 hover:bg-gray-100 rounded-lg">
                            {btn.icon}
                            <span className="text-sm">{btn.label}</span>
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      );

    case 'Hamburger Right':
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Left Side - Only shows if logo is toggled on */}
              <Logo />
              
              {/* Right Side - Hamburger ALWAYS Visible (Both mobile AND desktop) */}
              <div className="flex items-center space-x-4">
                {/* Extra buttons on desktop */}
                <div className="hidden md:flex items-center space-x-2">
                  {activeExtraButtons.map(buttonId => (
                    <ExtraButton key={buttonId} button={buttonId} />
                  ))}
                </div>
                
                {/* Hamburger Icon - ALWAYS VISIBLE (no md:hidden) */}
                <HamburgerButton 
                  onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} 
                  isOpen={isHamburgerOpen}
                />
              </div>
            </div>
            
            {/* Mobile & Desktop Menu (when hamburger is clicked) */}
            {isHamburgerOpen && (
              <div className="mt-4 space-y-2 border-t pt-4">
                {/* Core Navigation Items */}
                <div className="space-y-2">
                  {coreNavItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsHamburgerOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ))}
                </div>
                
                {/* Extra Buttons Section */}
                {activeExtraButtons.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-xs font-semibold text-gray-600 px-4 mb-2">EXTRA BUTTONS</div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeExtraButtons.map(buttonId => {
                        const btn = availableExtraButtons.find(b => b.id === buttonId);
                        return btn ? (
                          <button key={btn.id} className="flex items-center gap-2 p-3 text-gray-800 hover:bg-gray-100 rounded-lg">
                            {btn.icon}
                            <span className="text-sm">{btn.label}</span>
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      );

    case 'Hamburger Left':
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Left Side - Hamburger Icon and Logo */}
              <div className="flex items-center space-x-4">
                {/* Hamburger Icon on LEFT side - Always visible */}
                <HamburgerButton 
                  onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} 
                  isOpen={isHamburgerOpen}
                />
                
                {/* Logo */}
                <Logo className="text-gray-800" />
              </div>
              
              {/* Right Side - Extra Buttons ONLY (NO central navigation) */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  {activeExtraButtons.map(buttonId => (
                    <ExtraButton key={buttonId} button={buttonId} />
                  ))}
                </div>
                {/* Mobile placeholder */}
                <div className="w-10 md:hidden"></div>
              </div>
            </div>
            
            {/* Mobile & Desktop Menu - Opens when hamburger is clicked */}
            {isHamburgerOpen && (
              <div className="mt-4 space-y-2 pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-600 px-4 mb-2">NAVIGATION</div>
                {coreNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsHamburgerOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
                {activeExtraButtons.length > 0 && (
                  <>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-xs font-semibold text-gray-600 px-4 mb-2">EXTRA BUTTONS</div>
                      {activeExtraButtons.map(buttonId => {
                        const btn = availableExtraButtons.find(b => b.id === buttonId);
                        return btn ? (
                          <button key={btn.id} className="flex items-center gap-3 py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium w-screen">
                            {btn.icon}
                            {btn.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      );

    case 'No Navbar':
      return null;

    default:
      return (
        <nav className={`bg-white shadow-lg w-screen ${navbarHeightClass}`}>
          <div className="w-screen px-4 sm:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              <Logo />
              <div className="text-gray-800">No Navbar Selected</div>
            </div>
          </div>
        </nav>
      );
  }
}

function App() {
  const [navbarType, setNavbarType] = useState('Hamburger Left');
  const [extraButtons, setExtraButtons] = useState([]); // Logo NOT enabled by default
  const [showButtonPanel, setShowButtonPanel] = useState(false);

  const navbarTypes = [
    'Left Elements', 
    'Right Elements',
    'Central Elements',
    'Hamburger Right',
    'Hamburger Left',
    'No Navbar'
  ];

  const availableExtraButtons = [
    { id: 'logo', label: 'Logo', icon: <Image className="w-4 h-4" />, color: 'purple', type: 'logo' },
    { id: 'search', label: 'Search', icon: <Search className="w-4 h-4" />, color: 'gray', type: 'icon' },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" />, color: 'purple', type: 'icon' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, color: 'blue', type: 'icon' },
    { id: 'signup', label: 'Sign Up', icon: <User className="w-4 h-4" />, color: 'gradient', gradient: 'from-blue-500 to-cyan-500', type: 'button' },
  ];

  const toggleNavbar = () => {
    const currentIndex = navbarTypes.indexOf(navbarType);
    const nextIndex = (currentIndex + 1) % navbarTypes.length;
    setNavbarType(navbarTypes[nextIndex]);
  };

  const toggleExtraButton = (buttonId) => {
    if (extraButtons.includes(buttonId)) {
      setExtraButtons(extraButtons.filter(id => id !== buttonId));
    } else {
      setExtraButtons([...extraButtons, buttonId]);
    }
  };

  const ExtraButtonControl = ({ button }) => (
    <button
      onClick={() => toggleExtraButton(button.id)}
      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors flex-shrink-0 ${
        extraButtons.includes(button.id) 
          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      style={{ minWidth: '120px' }}
    >
      {button.icon}
      <span className="text-sm font-medium truncate">{button.label}</span>
      <span className="text-xs flex-shrink-0">{extraButtons.includes(button.id) ? '✓' : '+'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-screen overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar type={navbarType} extraButtons={extraButtons} />
    
      {/* Control Panel */}
      <div className="fixed bottom-20 left-4 right-4 sm:left-4 sm:right-auto sm:w-auto z-40">
        <button
          onClick={() => setShowButtonPanel(!showButtonPanel)}
          className="flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl mb-2"
        >   
             <span className={`transform transition-transform ${showButtonPanel ? 'rotate-45' : ''}`}>
        <Plus className="w-5 h-5" />
      </span>
         <span> Extra</span>   
        </button>  
      
              
        {showButtonPanel && (
          <div className="bg-white rounded-lg shadow-xl p-4 mb-4 max-w-[600px]">
            <h3 className="font-bold text-gray-800 mb-3 text-center">Add/Remove Extra Buttons</h3>
            
            {/* Single line of buttons with horizontal layout */}
            <div className="flex flex-nowrap gap-2 mb-4 overflow-x-auto pb-2">
              {availableExtraButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => toggleExtraButton(button.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors flex-shrink-0 ${
                    extraButtons.includes(button.id) 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ minWidth: '120px' }}
                >
                  {button.icon}
                  <span className="text-sm font-medium truncate">{button.label}</span>
                  <span className="text-xs flex-shrink-0">{extraButtons.includes(button.id) ? '✓' : '+'}</span>
                </button>
              ))}
            </div>
            
            {/* Active buttons info */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                {extraButtons.length === 0 
                  ? 'No buttons added' 
                  : `Active buttons: ${extraButtons.length}`
                }
              </div>
              {extraButtons.length > 0 && (
                <div className="text-xs text-purple-600 bg-purple-50 rounded-lg p-2">
                  <span className="font-medium">Active:</span>{' '}
                  {extraButtons.map((id, index) => {
                    const btn = availableExtraButtons.find(b => b.id === id);
                    return (
                      <span key={id}>
                        {btn?.label}
                        {index < extraButtons.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navbar Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleNavbar}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          Navbar:
          <span className="ml-2 px-2 py-1 bg-white/20 rounded text-sm">
            {navbarType}
          </span>
        </button>
      </div>



      {/* Main Content */}
      <main className="w-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Current Navbar: <span className="text-purple-600">{navbarType}</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {navbarType === 'Hamburger Left' 
              ? 'Hamburger menu on LEFT side only - NO central navigation elements. Logo and extra buttons on right.' 
              : navbarType === 'Right Elements' 
              ? 'Navigation is now on the RIGHT side (not centered). Logo NOT enabled by default.' 
              : 'Logo is NOT enabled by default. Use the control panel to add it.'}
          </p>
        </div>

        {/* Example Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {[1, 2, 3].map((card) => (
            <div key={card} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Feature {card}</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {navbarType === 'Hamburger Left' 
                  ? 'Hamburger menu is always visible on the left side. No central navigation - only hamburger, logo, and extra buttons.'
                  : 'All navbars now have white backgrounds and black text with icons.'}
              </p>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-100 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="w-screen">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Navbar & Footer Demo</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                <strong>Key Features:</strong><br/>
                1. <strong>NAVBAR TYPES</strong> - {navbarTypes.length} different navbar layouts<br/>
                2. <strong>EXTRA BUTTONS</strong> - Customize with additional UI elements<br/>
                4. <strong>RESPONSIVE DESIGN</strong> - Works on all screen sizes<br/>
                5. <strong>TOGGLE BUTTONS</strong> - Switch between navbar types easily
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={toggleNavbar}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl w-screen sm:w-auto"
                >
                  Next Navbar →
                </button>

              </div>
            </div>
            <div className="text-center lg:text-right mt-4 lg:mt-0">
              <div className="text-5xl mb-2">🎨</div>
              <p className="text-gray-500">Design System</p>
            </div>
          </div>
        </div>



        {/* Navbar Types Info */}
        <div className="mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Available Navbar Types</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navbarTypes.map((type) => (
              <div 
                key={type} 
                className={`p-4 rounded-lg border ${navbarType === type ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{type}</span>
                  {navbarType === type && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Current</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {type === 'Left Elements' && 'Logo & nav left, buttons right (white background, black text + icons)'}
                  {type === 'Right Elements' && 'Logo left, navigation RIGHT, buttons right (white background, black text + icons)'}
                  {type === 'Central Elements' && 'Standard layout with hover effects (white background, black text + icons)'}
                  {type === 'Hamburger Right' && 'Hamburger always visible, nav hidden until clicked (white background, black text + icons)'}
                  {type === 'Hamburger Left' && 'Hamburger LEFT, NO central nav, logo/buttons right (white background, black text + icons)'}
                  {type === 'No Navbar' && 'No navigation bar displayed'}
                </p>
                <div className="mt-2 text-xs text-purple-600">
                  {type !== 'No Navbar' ? 'White background, black text' : 'Hidden'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>


    </div>
  );
}

export default App;