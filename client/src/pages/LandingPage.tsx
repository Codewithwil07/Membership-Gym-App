import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Play,
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Star,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface MembershipPlan {
  name: string;
  price: number;
  duration: number;
  features: string[];
}

interface StatItem {
  label: string;
  value: string;
  icon: typeof Users;
}

interface FeatureItem {
  icon: typeof CreditCard;
  title: string;
  description: string;
}

interface ContactItem {
  icon: typeof MapPin;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

const GymLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const [current, setCurrent] = useState(0);


const { user, loading } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  document.title = "Landing page || PlatinumGym"
  if (!loading && user) {
    navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard", {
      replace: true,
    });
  }
}, [loading, user, navigate]);

if (loading || user) {
  return (
    <div className="text-center mt-10 text-white animate-pulse">
      Checking session...
    </div>
  );
}

  const membershipPlans: MembershipPlan[] = [
    {
      name: "Basic",
      price: 299000,
      duration: 30,
      features: [
        "Akses gym 24/7",
        "Locker gratis",
        "Wi-Fi berkecepatan tinggi",
        "Shower facilities",
      ],
    },
    {
      name: "Premium",
      price: 499000,
      duration: 30,
      features: [
        "Semua fitur Basic",
        "Personal trainer 2x/bulan",
        "Nutrisi konsultasi",
        "Akses kelas grup",
        "Protein shake gratis",
      ],
    },
    {
      name: "Elite",
      price: 799000,
      duration: 30,
      features: [
        "Semua fitur Premium",
        "Personal trainer unlimited",
        "Meal planning",
        "Body composition analysis",
        "Priority booking",
      ],
    },
  ];

  const stats: StatItem[] = [
    { label: "Active Members", value: "2,500+", icon: Users },
    { label: "Monthly Workouts", value: "15,000+", icon: TrendingUp },
    { label: "Success Stories", value: "1,200+", icon: Star },
    { label: "Years Experience", value: "8+", icon: Calendar },
  ];

  const features: FeatureItem[] = [
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description:
        "Multiple payment options with automatic renewal and transaction tracking",
    },
    {
      icon: Calendar,
      title: "Smart Attendance",
      description:
        "Track your workout sessions and maintain consistency with our smart system",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description:
        "Detailed insights into your fitness journey and goal achievements",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a vibrant community of fitness enthusiasts and expert trainers",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Work out on your schedule with round-the-clock gym access",
    },
    {
      icon: Star,
      title: "Premium Equipment",
      description:
        "State-of-the-art fitness equipment from leading global brands",
    },
  ];
  const testimonials: Testimonial[] = [
    {
      name: "Rina",
      text: "Pelatihnya ramah dan fasilitas lengkap.",
      image: "/rina.jpg",
    },
    {
      name: "Andi",
      text: "Sekarang badan lebih fit dan bugar.",
      image: "/andi.jpg",
    },
    {
      name: "Sari",
      text: "Tempat nyaman dan harga terjangkau.",
      image: "/sari.jpg",
    },
  ];
  const contactInfo: ContactItem[] = [
    {
      icon: MapPin,
      title: "Location",
      description: "Jl. Pemuda No. 123, Surabaya, East Java",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "+62 31 1234 5678",
    },
    {
      icon: Mail,
      title: "Email",
      description: "hello@fitzone.id",
    },
  ];

  const menuItems: string[] = [
    "Home",
    "Membership",
    "Features",
    "About",
    "Contact",
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-green-400 flex items-center gap-x-3"
            >
              <Dumbbell className="text-white" />
              PlatinumGym
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 border-t border-gray-800"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {menuItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-green-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
        <section>
          <motion.div
            style={{ y: heroY }}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Body & Mind
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              >
                Join thousands of members who've achieved their fitness goals
                with our state-of-the-art equipment and expert guidance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-black font-bold py-4 px-8 rounded-full text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Play size={20} fill="currentColor" />
                  Start Your Journey
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:border-green-400 transition-colors w-full sm:w-auto"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-500/10 rounded-full">
                      <IconComponent size={32} className="text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="membership" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your
              <span className="block text-green-400">Membership</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Flexible plans designed to fit your lifestyle and fitness goals
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-2xl border ${
                  index === 1
                    ? "border-green-400 bg-gradient-to-b from-green-900/20 to-black"
                    : "border-gray-700 bg-gradient-to-b from-gray-900/50 to-black"
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">
                      Rp {plan.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-400">/{plan.duration} hari</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    index === 1
                      ? "bg-green-400 text-black hover:bg-green-300"
                      : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  Choose Plan
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Premium
              <span className="block text-green-400">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 hover:border-green-400/50 transition-all"
                >
                  <div className="p-3 bg-green-500/10 rounded-full w-fit mb-4">
                    <IconComponent size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            What Our <span className="text-green-400">Members Say</span>
          </h2>
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-full flex flex-col items-center justify-center px-4"
                >
                  <motion.img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 rounded-full mb-6 object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-lg md:text-xl max-w-xl mb-4 text-gray-300">
                    “{t.text}”
                  </p>
                  <h3 className="text-green-400 font-bold text-xl">{t.name}</h3>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full ${
                    current === i ? "bg-green-400" : "bg-gray-600"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start?
              <span className="block text-green-400">Let's Connect</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                return (
                  <div key={info.title} className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <IconComponent size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{info.title}</h3>
                      <p className="text-gray-400">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-400 text-black font-bold py-4 px-6 rounded-lg hover:bg-green-300 transition-colors"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-4">
              FITZONE
            </div>
            <p className="text-gray-400 mb-6">
              Transform your body, elevate your mind.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Support
              </a>
            </div>
            <p className="text-gray-600 text-sm mt-6">
              © 2025 FITZONE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GymLandingPage;
