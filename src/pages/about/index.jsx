import { Award, Clock, Package, Users } from "lucide-react";

const StatsCard = ({ icon: Icon, number, text }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
    <Icon className="w-8 h-8 text-blue-600 mb-2" />
    <h3 className="text-2xl font-bold text-gray-800">{number}</h3>
    <p className="text-gray-600 text-center">{text}</p>
  </div>
);

const About = () => {
  return (
    <div className="bg-blue-100 min-h-screen font-body">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
          alt="Tech workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              C-Techs Gadgets
            </h1>
            <p className="text-xl md:text-2xl">
              Your Premium Technology Partner
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 -mt-32 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            At TechHub Gadgets, we're dedicated to bringing you the latest and
            most innovative technology solutions. Our carefully curated
            selection of gadgets and accessories ensures that you stay ahead in
            the digital age.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <StatsCard icon={Users} number="10K+" text="Happy Customers" />
          <StatsCard icon={Package} number="500+" text="Products" />
          <StatsCard icon={Award} number="50+" text="Awards" />
          <StatsCard icon={Clock} number="24/7" text="Support" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg"
              alt="Latest tech"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Latest Technology
            </h3>
            <p className="text-gray-600">
              We pride ourselves on offering the most cutting-edge gadgets and
              accessories. From professional cameras to high-end headphones, we
              ensure our inventory reflects the latest innovations in
              technology.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Our team of tech enthusiasts is always ready to help you find the
              perfect gadget for your needs. With extensive product knowledge
              and passion for technology, we ensure you make informed decisions.
            </p>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg"
              alt="Expert team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="Customer"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "Amazing selection of gadgets and exceptional customer service!"
              </p>
              <p className="font-bold text-gray-800">John Doe</p>
              <p className="text-gray-500">Professional Photographer</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt="Customer"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "The tech support team is knowledgeable and always helpful."
              </p>
              <p className="font-bold text-gray-800">Jane Smith</p>
              <p className="text-gray-500">Tech Enthusiast</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg"
                alt="Customer"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "Best prices for quality tech products in the market!"
              </p>
              <p className="font-bold text-gray-800">Mike Johnson</p>
              <p className="text-gray-500">Content Creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
