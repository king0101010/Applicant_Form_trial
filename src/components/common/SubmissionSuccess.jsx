import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SubmissionSuccess = () => {
  return (
    <div className="min-h-screen bg-[#f3f5ed] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <svg
                className="h-12 w-12 text-[#642c92]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#642c92] mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Thank you for submitting your application. We have received your details and will
              review them shortly.
            </p>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              Our team will contact you if your profile matches our requirements. You can expect to
              hear from us within 5-7 working days.
            </p>
            <div className="flex justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-[#642c92] text-white rounded-md font-medium hover:bg-[#4f2275] transition-colors duration-200"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionSuccess;
