import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const currentTime = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: currentTime,
    };

    emailjs
      .send(
        "service_i3nu0jg",
        "template_yl4bl6w",
        templateParams,
        "kX6XZ7Tj1d2XkJvRi"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setLoading(false);
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary pt-[50px] pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-secondary">
          Get in <span className="text-gold">Touch</span>
        </h1>
        <p className="text-secondary/70 text-lg max-w-2xl mx-auto">
          Have a question about a custom build or need support? We are here to
          help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <ContactInfoCard
            icon={<FaPhoneAlt />}
            title="Call Us"
            text="+94 71 422 5346"
            subText="Mon-Fri from 8am to 5pm"
          />
          <ContactInfoCard
            icon={<FaEnvelope />}
            title="Email Us"
            text="support@icomputers.com"
            subText="We reply within 24 hours"
          />
          <ContactInfoCard
            icon={<FaMapMarkerAlt />}
            title="Visit Us"
            text="123 Tech Street, Colombo 07"
            subText="Come say hello at our office HQ"
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-secondary">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-gray-50 border border-gray-300 text-secondary rounded-lg p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-secondary">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-gray-50 border border-gray-300 text-secondary rounded-lg p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Inquiry about custom PC..."
                className="bg-gray-50 border border-gray-300 text-secondary rounded-lg p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="bg-gray-50 border border-gray-300 text-secondary rounded-lg p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none placeholder-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-gold text-white font-bold py-4 rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, title, text, subText }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-gold text-xl shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-secondary">{title}</h3>
        <p className="text-gold font-bold">{text}</p>
        <p className="text-gray-500 text-sm">{subText}</p>
      </div>
    </div>
  );
}
