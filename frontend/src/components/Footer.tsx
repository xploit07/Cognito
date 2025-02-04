import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Book,
  FileText,
  Users,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent mb-4">
            Cognito
          </h3>
          <p className="text-gray-400 mb-6">
            Empowering minds through innovative learning solutions. Join us in
            shaping the future of education.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={Facebook} />
            <SocialIcon icon={Twitter} />
            <SocialIcon icon={Instagram} />
            <SocialIcon icon={Linkedin} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <FooterLink href="/" text="Home" />
            <FooterLink href="/about" text="About Us" />
            <FooterLink href="/contact" text="Contact" />
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-emerald-400" />
              <span className="text-gray-400">help.cognito@gmail.com</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-emerald-400" />
              <span className="text-gray-400">+91 99325-66274</span>
            </li>
            <li className="flex items-center">
              <MapPin className="h-8 w-8 mr-3 text-emerald-400" />
              <span className="text-gray-400">
                Chingrighata, Sec-IV, Kolkata, West Bengal, India, 700101
              </span>
            </li>
          </ul>
        </div>

        {/* Support & Resources */}
        <div>
          <h4 className="font-bold text-lg mb-4">Support & Resources</h4>
          <ul className="space-y-4">
            <li className="flex items-center group">
              <HelpCircle className="h-5 w-5 mr-3 text-emerald-400" />
              <a
                href="#"
                className="text-gray-400 group-hover:text-emerald-400 transition-colors"
              >
                Help Center
              </a>
            </li>
            <li className="flex items-center group">
              <Book className="h-5 w-5 mr-3 text-emerald-400" />
              <a
                href="#"
                className="text-gray-400 group-hover:text-emerald-400 transition-colors"
              >
                Learning Resources
              </a>
            </li>
            <li className="flex items-center group">
              <FileText className="h-5 w-5 mr-3 text-emerald-400" />
              <a
                href="#"
                className="text-gray-400 group-hover:text-emerald-400 transition-colors"
              >
                Documentation
              </a>
            </li>
            <li className="flex items-center group">
              <Users className="h-5 w-5 mr-3 text-emerald-400" />
              <a
                href="#"
                className="text-gray-400 group-hover:text-emerald-400 transition-colors"
              >
                Community Forum
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>Developed with ❤ by</p>
        <p>
          Pratim Sarkar, Swayam Sahay, Soham Das, Vishal Kumar, Nilanjoy Ghosh
        </p>{" "}
        <p>&copy; {new Date().getFullYear()} Cognito. All rights reserved.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <a
    href="#"
    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
  >
    <Icon className="h-5 w-5" />
  </a>
);

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <li>
    <a
      href={href}
      className="text-gray-400 hover:text-emerald-400 transition-colors"
    >
      {text}
    </a>
  </li>
);

export default Footer;
