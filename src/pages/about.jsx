import {
  FaLaptopCode,
  FaHeadset,
  FaShippingFast,
  FaAward,
} from "react-icons/fa";

export default function About() {
  return (
    // CHANGE 1: Main Background -> Primary (Light), Text -> Secondary (Dark)
    <div className="w-full min-h-screen bg-primary text-secondary pt-[50px] pb-20 px-6">
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-secondary">
          Who We{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
            Are
          </span>
        </h1>
        {/* Description text -> darker gray for readability on light bg */}
        <p className="text-secondary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          At <span className="text-gold font-bold">i-Computers</span>, we don't
          just sell computers; we engineer dreams. From high-end gaming rigs to
          professional workstations, we are your ultimate tech partners.
        </p>
      </div>

      {/* 2. Content Section (Image + Text) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        {/* Left: Image */}
        <div className="relative group">
          {/* Glow Effect modified to match Gold theme */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

          <img
            src="/about.jpg"
            alt="Our Shop"
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80")
            }
            className="relative w-full rounded-2xl shadow-2xl border border-secondary/10 bg-white object-cover h-[400px]"
          />
        </div>

        {/* Right: Text */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-secondary">
            Driving the <span className="text-gold">Future of Tech</span>
          </h2>
          <p className="text-secondary/80 leading-relaxed font-medium">
            Founded with a passion for technology, i-Computers started as a
            small project and grew into a leading computer store. We believe in
            quality, performance, and aesthetics.
          </p>
          <p className="text-secondary/70 leading-relaxed">
            Whether you are a gamer looking for the highest FPS, a creator
            needing rendering power, or a student needing reliability, we have
            the perfect solution for you.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-4 border-t border-secondary/10 pt-6">
            <div>
              <h3 className="text-3xl font-bold text-gold">5K+</h3>
              <p className="text-sm text-secondary/60 font-semibold">
                Happy Clients
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gold">500+</h3>
              <p className="text-sm text-secondary/60 font-semibold">
                Custom Builds
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gold">100%</h3>
              <p className="text-sm text-secondary/60 font-semibold">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Why Choose Us" Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">
          Why Choose <span className="text-gold">Us?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FaLaptopCode />}
            title="Expert Guidance"
            desc="We help you choose the best components for your needs."
          />
          <FeatureCard
            icon={<FaAward />}
            title="Genuine Products"
            desc="100% original products with manufacturer warranty."
          />
          <FeatureCard
            icon={<FaShippingFast />}
            title="Fast Delivery"
            desc="Quick and safe delivery to your doorstep island-wide."
          />
          <FeatureCard
            icon={<FaHeadset />}
            title="24/7 Support"
            desc="Dedicated support team to assist you anytime."
          />
        </div>
      </div>
    </div>
  );
}

// Feature Card Component (Updated for Light Theme)
function FeatureCard({ icon, title, desc }) {
  return (
    // Card Styles: White BG, Light Border, Shadow on Hover
    <div className="bg-white p-8 rounded-xl border border-secondary/10 shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 group">
      <div className="text-4xl text-secondary/40 group-hover:text-gold transition-colors duration-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-sm text-secondary/70">{desc}</p>
    </div>
  );
}
