import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#642c92] to-pink-500 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
        {/* 1. Company Info + Social + QR */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Company Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Sunvi Hi-Tech</h2>
            <p className="text-sm text-white mt-0.5">
              Helping workers to find trusted job
            </p>
          </div>

          {/* Social Media Icons - Now centered on mobile */}
          <div className="flex justify-center space-x-8 w-full">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-[#642c92] transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-[#642c92] transition duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/sunvihitech?igsh=MTVvcGl1ajloMzRzbQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-[#642c92] transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-[#642c92] transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="/images/qr_code.png"
              alt="QR to Brochure"
              className="w-32 h-32 object-contain rounded-md shadow-md"
            />
            <span className="text-sm text-white">Scan to download brochure</span>
          </div>
        </div>

        {/* Rest of your footer columns remain the same */}
        {/* 2. Navigation */}
        <div className="flex flex-col space-y-1">
          <span className="text-xl text-white font-semibold mb-2">Navigation</span>
          <ul className="space-y-1">
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Home
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Current Jobs
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Services
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Resources
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Industry
            </li>
          </ul>
        </div>

        {/* 3. Jobs by Location */}
        <div className="flex flex-col space-y-1">
          <span className="text-xl text-white font-semibold mb-2">Jobs By Location</span>
          <ul className="space-y-1">
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              India
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Overseas
            </li>
          </ul>
        </div>

        {/* 4. Jobs by Industry */}
        <div className="flex flex-col space-y-1">
          <span className="text-xl text-white font-semibold mb-2">Jobs By Industry</span>
          <ul className="space-y-1">
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Constructor Worker
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Driver
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Hotel Staff
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Security
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              House Helping
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Cook
            </li>
            <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
              Maintenance
            </li>
          </ul>
        </div>

        {/* 5. For Job Seekers & Employers */}
        <div className="flex flex-col space-y-6">
          {/* Job Seekers */}
          <div>
            <span className="text-xl text-white font-semibold">For Job Seekers</span>
            <ul className="space-y-1 mt-1">
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                Job Seekers Login
              </li>
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                Search Jobs
              </li>
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                How to Find Job
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <span className="text-xl text-white font-semibold">For Employers</span>
            <ul className="space-y-1 mt-1">
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                Employers Login
              </li>
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                Post Job
              </li>
              <li className="text-base text-white hover:text-[#642c92] transition duration-300 cursor-pointer">
                Hiring Guide
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;