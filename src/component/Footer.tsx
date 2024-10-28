function Footer() {
    return (
        <footer className="flex items-center justify-between py-4 px-10 bg-gray-100 text-gray-700">
            <div className="flex items-center space-x-2">
                <img src="src/public/img/logo-green.png" alt="footer logo" className="h-8" />
                <span className="text-green-500 font-semibold">NATOURS</span>
            </div>
            <div className="flex space-x-4 text-sm">
                <a href="#" className="hover:underline">About us</a>
                <a href="#" className="hover:underline">Download apps</a>
                <a href="#" className="hover:underline">Become a guide</a>
                <a href="#" className="hover:underline">Careers</a>
                <a href="#" className="hover:underline">Contact</a>
            </div>
            <p className="text-sm">&copy; 2024 by Mridul Mishra.</p>
        </footer>
    );
}

export default Footer;
