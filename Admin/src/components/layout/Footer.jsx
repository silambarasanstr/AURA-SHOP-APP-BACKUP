const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left */}
        <p className="text-sm text-gray-600">
          © 2026 My App. All rights reserved.
        </p>

        {/* Right Links */}
        <div className="flex gap-4 mt-3 md:mt-0 text-sm text-gray-500">
          <a href="#" className="hover:text-black transition">
            Privacy
          </a>
          <a href="#" className="hover:text-black transition">
            Terms
          </a>
          <a href="#" className="hover:text-black transition">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
