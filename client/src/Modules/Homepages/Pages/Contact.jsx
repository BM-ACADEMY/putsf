import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-10">
          Contact Us
        </h2>

        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 space-y-8">
          <p className="text-lg text-gray-700 text-center">
            Have questions or want to connect? Reach out to us through the following details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {/* Address */}
            <div className="flex flex-col items-center">
              <MapPin className="text-indigo-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Address</h3>
              <p className="text-gray-600 mt-2">
                NO1, 2nd Cross, Pothigai Nagar, Nawarkulam,<br />
                Lawspet Post, Puducherry – 605008
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <Mail className="text-indigo-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Email</h3>
              <a
                href="mailto:swaminathan933@gmail.com"
                className="text-indigo-600 hover:underline mt-2"
              >
                swaminathan933@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <Phone className="text-indigo-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900">Phone</h3>
              <a
                href="tel:+919787721199"
                className="text-indigo-600 hover:underline mt-2"
              >
                +91 97877 21199
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
