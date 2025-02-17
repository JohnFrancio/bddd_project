const Navbar = () => {
    return (
        <div>
            <nav class="w-64 bg-gray-800 text-white">
                <ul class="space-y-4 p-4">
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-700 rounded">Home</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-700 rounded">About</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-700 rounded">Services</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-700 rounded">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Navbar;