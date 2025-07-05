import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../config/firebase";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
    const navigate = useNavigate();
    const [log, setLog] = useState(false);
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const firebaseAuth = getAuth();

        const sendCartRequest = async (user) => {
            const token = await user.getIdToken();

            const response = await fetch(backendUrl + '/api/cart/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const data = await response.json();
            console.log(data.cart.products);
        };

        // Use Firebase auth state observer to get current user reliably
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                sendCartRequest(user);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setLog(!!user);
            console.log(user ? "User Logged In" : "User Logged Out");
        });
    }, []);

    function logout() {
        signOut(auth);
        navigate("/");
    }

    return (
        <div className="flex items-center w-full justify-between p-5 md:p-10 flex-wrap border-b-2 shadow-lg z-50 bg-white top-0 left-0 right-0 h-[120px]">
            <div className="flex gap-2 items-center">
                <img src={assets.logo} className="w-32" alt="" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden gap-5 justify-around md:flex">
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    < p>Home</ p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    < p>Collections</ p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
                </NavLink>
                <NavLink to='/About' className='flex flex-col items-center gap-1'>
                    < p>About</ p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    < p>Contact</ p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
                </NavLink>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 sm:gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search_icon" className="w-5 h-5 cursor-pointer" />
                <div className="relative group">
                    <img src={assets.profile_icon} alt="profile_icon" className="w-5 h-5 cursor-pointer" />
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <NavLink className="cursor-pointer hover:text-black">
                                < p>My Profile</ p>
                            </NavLink>
                            <NavLink to='/orders' className="cursor-pointer hover:text-black">
                                < p>Orders</ p>
                            </NavLink>
                            {
                                log ?
                                    <div className="flex gap-5">
                                        <button className=" px-6 py-2 font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-700  text-white shadow-lg hover:from-indigo-700  hover:to-purple-500 transition-all duration-300 md:flex" onClick={logout}>
                                            Logout
                                        </button>
                                    </div> :
                                    <div className="flex flex-col gap-2">
                                        <button className="px-6 py-2 font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-700  text-white shadow-lg hover:from-indigo-700  hover:to-purple-500 transition-all duration-300" onClick={() => navigate("/login")}>
                                            Login
                                        </button>
                                        <button className="px-6 py-2 font-semibold rounded-xl bg-white border-2 border-purple-500 text-indigo-500 shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300" onClick={() => navigate("/signup")}>
                                            Signup
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart_icon" />
                    <p className="absolute right-[-10px] bottom-[-7px] w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartCount()}
                    </p>
                </Link>
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className="w-5 cursor-pointer md:hidden"
                    alt="menu_icon"
                />
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 bottom-0 bg-white w-[250px] transition-transform transform ${visible ? "translate-x-0" : "translate-x-full"
                    } overflow-hidden z-50 shadow-lg`}
            >
                <div className="p-5 flex flex-col gap-4 text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 cursor-pointer"
                    >
                        <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="dropdown_icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to="/" className="p-1 px-3 rounded-md">Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/collection" className="p-1 px-3 rounded-md">Collections</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/About" className="p-1 px-3 rounded-md">About</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/contact" className="p-1 px-3 rounded-md">Contact</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
