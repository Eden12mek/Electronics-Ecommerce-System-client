
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import KHM from '../assest/KHM.png';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import EndPoint from '../common';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import Context from '../context'
import ROLE from '../common/role';
import SummaryApi from '../common';



const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

// Add this effect to fetch notifications
useEffect(() => {
  if (user?._id) {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${SummaryApi.getNotifications.url}?userId=${user._id}`, {
          method: SummaryApi.getNotifications.method,
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
    
    // Set up polling or use WebSockets for real-time updates
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }
}, [user]);

const markAsRead = async (notificationId) => {
  try {
    await fetch(`${SummaryApi.markNotificationRead.url}/${notificationId}`, {
      method: SummaryApi.markNotificationRead.method,
      credentials: 'include'
    });
    setNotifications(notifications.map(n => 
      n._id === notificationId ? {...n, read: true} : n
    ));
    setUnreadCount(prev => prev - 1);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

const markAllAsRead = async () => {
  try {
    await fetch(`${SummaryApi.markAllNotificationsRead.url}?userId=${user._id}`, {
      method: SummaryApi.markAllNotificationsRead.method,
      credentials: 'include'
    });
    setNotifications(notifications.map(n => ({...n, read: true})));
    setUnreadCount(0);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
};

  const handleLogout = async () => {
    const fetchData = await fetch(EndPoint.logout_user.url, {
      method: EndPoint.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }


  return (
    <header className='h-16 shadow-md fixed w-full z-40' style={{ backgroundColor: '#FFFCFA' }}>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        {/* Left section with the logo and navigation links */}
        <div className='flex flex-row'>
          <Link to={"/"}>
            <img src={KHM} alt="KHM Logo" width="50" height="30" className="bg-opacity-100" />
          </Link>
          <nav className='flex space-x-6 pt-4'>
            <Link to={"/about-us"} className='text-lg text-gray-700 hover:text-[#7709FE]'>About Us</Link>
            <Link to={"/contact-us"} className='text-lg text-gray-700 hover:text-[#7709FE]'>Contact Us</Link>
          </nav>
        </div>

        {/* Search input section */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>


        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }


            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <>
                        <Link to={"/admin-panel/dashboard"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                        <Link to={"/admin-panel/admin-profile"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>My Profile</Link>
                        </>
                      )
                    }
                    {
                      user?.role === ROLE.GENERAL && (
                        
                        <Link to={"/user-profile"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>My Profile</Link>
                        
                      )
                    }

                  </nav>
                </div>
              )
            }

          </div>

            {/* Notification Bell */}
{
  user?.role === ROLE.GENERAL && (
    <div className='text-2xl relative cursor-pointer'>
      <span onClick={() => setShowNotifications(!showNotifications)}>
        <FaBell />
        {unreadCount > 0 && (
          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
            <p className='text-sm'>{unreadCount}</p>
          </div>
        )}
      </span>
      
      {showNotifications && (
        <div className='absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50'>
          <div className='p-2 border-b'>
            <h3 className='font-semibold'>Notifications</h3>
          </div>
          <div className='max-h-60 overflow-y-auto'>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification._id} 
                  className={`p-3 border-b ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification._id)}
                >
                  <p className='text-sm'>{notification.message}</p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div className='p-3 text-center text-sm text-gray-500'>
                No notifications
              </div>
            )}
          </div>
          <div className='p-2 border-t text-center'>
            <button 
              className='text-sm text-blue-500'
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }



          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header;