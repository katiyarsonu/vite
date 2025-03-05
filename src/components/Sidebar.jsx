import { useState, useEffect } from 'react'
import { 
  FaHome, 
  FaFileAlt, 
  FaClipboardList, 
  FaAddressBook, 
  FaBuilding, 
  FaChartBar, 
  FaSearch, 
  FaPuzzlePiece, 
  FaQuestionCircle, 
  FaUser,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'
import useResumeStore from '../store/resumeStore'

function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useResumeStore()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('resume')

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome size={20} /> },
    { id: 'resume', label: 'Resume Builder', icon: <FaFileAlt size={20} /> },
    { id: 'tracker', label: 'ATS Score', icon: <FaClipboardList size={20} /> },
    { id: 'contacts', label: 'Contacts', icon: <FaAddressBook size={20} /> },
    { id: 'companies', label: 'Companies', icon: <FaBuilding size={20} /> },
    { id: 'styles', label: 'History', icon: <FaChartBar size={20} /> },
    { id: 'search', label: 'Job Search', icon: <FaSearch size={20} /> },
    { id: 'extension', label: 'Extension', icon: <FaPuzzlePiece size={20} /> },
    { id: 'support', label: 'Support Center', icon: <FaQuestionCircle size={20} /> },
    { id: 'account', label: 'Account', icon: <FaUser size={20} /> }
  ]

  const handleItemClick = (id) => {
    setActiveItem(id)
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div 
      className={`fixed top-0 left-0 h-full bg-teal-800 text-white transition-all duration-300 z-10 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleSidebar} 
          className="text-white hover:text-teal-200 transition-colors"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center p-4 hover:bg-teal-700 transition-colors ${
                  activeItem === item.id ? 'bg-teal-700' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="inline-block">{item.icon}</span>
                  {!isSidebarCollapsed && (
                    <span className="ml-4 whitespace-nowrap">{item.label}</span>
                  )}
                </div>
              </button>
              {isSidebarCollapsed && (
                <div className="group relative">
                  <div 
                    className="absolute left-16 top-0 bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    {item.label}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  // Mobile header with hamburger menu
  const MobileHeader = () => (
    <div className="fixed top-0 left-0 right-0 bg-teal-800 text-white p-4 flex justify-between items-center z-20">
      <button 
        onClick={toggleMobileMenu}
        className="text-white focus:outline-none"
        aria-label="Open menu"
      >
        <FaBars size={24} />
      </button>
      <div className="text-xl font-bold">Resume Builder</div>
      <div className="w-6"></div> {/* Spacer for alignment */}
    </div>
  )

  // Mobile menu overlay
  const MobileMenu = () => (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      ></div>
      
      {/* Slide-in menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-teal-800 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-teal-700">
          <div className="text-xl font-bold">Menu</div>
          <button 
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center p-4 hover:bg-teal-700 transition-colors ${
                    activeItem === item.id ? 'bg-teal-700' : ''
                  }`}
                >
                  <span className="inline-block">{item.icon}</span>
                  <span className="ml-4">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )

  return (
    <>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileMenu />
          <div className="pt-16"></div> {/* Spacer for fixed header */}
        </>
      ) : (
        <>
          <DesktopSidebar />
          <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}></div>
        </>
      )}
    </>
  )
}

export default Sidebar