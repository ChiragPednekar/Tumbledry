import Link from "next/link";
import { MapPin, Mail, Phone, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-dark font-bold text-xl leading-none">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">tumbledry</span>
            </Link>
            <p className="text-blue-100 text-sm leading-relaxed">
              Professional garment care designed for modern urban life. We combine international standard machines with specialized chemicals to give your clothes the care they deserve.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Dry Cleaning</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wash & Fold</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wash & Iron</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shoe Cleaning</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bag Cleaning</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Curtain Cleaning</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Franchise Opportunity</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Store Locator</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-white">Toll Free</p>
                  <p>1800 123 4567</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p>care@tumbledry.in</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-white">Corporate Office</p>
                  <p>Sector 62, Noida, UP, India 201309</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
          <p>© {new Date().getFullYear()} Tumbledry Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
