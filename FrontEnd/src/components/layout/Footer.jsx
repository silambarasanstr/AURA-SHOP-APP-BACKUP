const Footer = () => {
  return (
    <footer className="py-3 bg-gray-200 container mx-auto p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <p className="text-sm">© 2026 AURA Shop. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
