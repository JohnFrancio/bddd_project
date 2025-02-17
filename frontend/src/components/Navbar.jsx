const Navbar = () => {
    return (
        <div>
            <nav className="w-64 bg-gray-800 text-white">
                <ul className="space-y-4 p-4">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">About</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Services</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Navbar;