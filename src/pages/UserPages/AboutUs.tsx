import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-gray-900">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-700">About Us</h2>
          <p className="text-lg text-gray-600 mt-3">
            Discover our journey and commitment to providing top-quality products with exceptional service.
          </p>
        </div>
  
        {/* Our Story Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-blue-800">Our Story</h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Founded in 2025, <span className="font-semibold text-blue-600">RideVibes</span> was built on a passion for delivering high-quality products at unbeatable prices.
            We started as a small business and grew into a trusted e-commerce platform serving thousands of satisfied customers worldwide.
          </p>
        </div>
  
        {/* Mission & Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700">Our Mission</h3>
            <p className="text-gray-700 mt-2">
              To provide high-quality, affordable products while ensuring a seamless shopping experience that exceeds customer expectations.
            </p>
          </div>
  
          {/* Values */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-700">Our Values</h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>✅ Customer Satisfaction First</li>
              <li>✅ Commitment to Quality</li>
              <li>✅ Secure and Fast Delivery</li>
              <li>✅ Innovation and Growth</li>
            </ul>
          </div>
        </div>
  
        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-green-800">Why Choose Us?</h3>
          <ul className="mt-4 space-y-3 text-gray-800">
            <li className="flex items-center"><span className="text-green-600 text-xl mr-2">✔</span> Handpicked, premium-quality products</li>
            <li className="flex items-center"><span className="text-green-600 text-xl mr-2">✔</span> Competitive pricing with amazing deals</li>
            <li className="flex items-center"><span className="text-green-600 text-xl mr-2">✔</span> Secure payments & fast shipping</li>
            <li className="flex items-center"><span className="text-green-600 text-xl mr-2">✔</span> 24/7 dedicated customer support</li>
          </ul>
        </div>
  
        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900">Join Our Community</h3>
          <p className="text-gray-600 mt-2">Be part of our journey and enjoy a world-class shopping experience.</p>
          <Link to='/bicycles'>
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Start Shopping
          </button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  