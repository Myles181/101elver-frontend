import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#004E92] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">BlueKey</h3>
          <p className="text-sm text-white/85">
            Find trusted short-stay rentals across North Cyprus. Clean listings, verified owners, and easy booking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Rentals</a></li>
            <li><a href="#" className="hover:underline">Agents</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><FiPhone aria-hidden="true" /> <span>+90 123 456 789</span></li>
            <li className="flex items-center gap-2"><FiMail aria-hidden="true" /> <span>hello@bluekey.example</span></li>
            <li className="text-xs text-white/80 mt-2">Office: Lefkosa, North Cyprus</li>
          </ul>
        </div>

        {/* Social / Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Follow us</h4>

          <div className="flex items-center gap-3 mb-4">
            <a aria-label="Facebook" href="#" className="p-2 rounded-md bg-white/8 hover:bg-white/12 transition">
              <FiFacebook size={20} />
            </a>
            <a aria-label="Instagram" href="#" className="p-2 rounded-md bg-white/8 hover:bg-white/12 transition">
              <FiInstagram size={20} />
            </a>
            <a aria-label="Twitter" href="#" className="p-2 rounded-md bg-white/8 hover:bg-white/12 transition">
              <FiTwitter size={20} />
            </a>
          </div>

          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter" className="sr-only">Subscribe to newsletter</label>
            <input
              id="newsletter"
              type="email"
              className="flex-1 min-w-0 px-3 py-2 rounded-md text-gray-900"
              placeholder="Email address"
              aria-label="Email address"
            />
            <button className="bg-[#00BFFF] text-white px-4 py-2 rounded-md hover:bg-[#0099cc] transition" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <span>© {new Date().getFullYear()} BlueKey. All rights reserved.</span>
          <div className="mt-3 md:mt-0">
            <a href="#" className="mr-4 hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
