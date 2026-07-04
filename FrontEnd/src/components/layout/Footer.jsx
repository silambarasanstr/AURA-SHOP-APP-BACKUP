const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-5 py-4 mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold tracking-widest text-gray-900 uppercase">
              AU<span className="text-amber-500">R</span>A
            </span>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 mt-0.5">
              Curated · Premium · Timeless
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">© 2026 AURA Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
