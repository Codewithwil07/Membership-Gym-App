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
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, Links, useNavigate } from "react-router-dom";

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
    if (!loading && user) {
      navigate(user?.role === "admin" ? "/admin/dashboard" : "/dashboard", {
        replace: true,
      });
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loading, user, navigate, current]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-white animate-pulse">
        Checking session...
      </div>
    );
  }

  const membershipPlans: MembershipPlan[] = [
    {
      name: "Daily",
      price: 10000,
      duration: 1,
      features: [
        "Akses gym 24/7",
        "Wi-Fi berkecepatan tinggi",
        "Nutrisi konsultasi",
        "Personal trainer",
      ],
    },
    {
      name: "Monthly",
      price: 60000,
      duration: 30,
      features: [
        "Semua fitur Basic",
        "Personal trainer 2x/bulan",
        "Nutrisi konsultasi",
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
      image:
        "https://tse3.mm.bing.net/th/id/OIP.XpBhL8rM25QK9fbCmm3tNQHaNK?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Andi",
      text: "Sekarang badan lebih fit dan bugar.",
      image:
        "data:image/webp;base64,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",
    },
    {
      name: "Sari",
      text: "Tempat nyaman dan harga terjangkau.",
      image:
        "https://cdn.pixabay.com/photo/2023/11/14/15/45/rose-8388019_1280.jpg",
    },
  ];
  const contactInfo: ContactItem[] = [
    {
      icon: MapPin,
      title: "Location",
      description: "Jl. Saronggi No.09, Bluto, East Java",
    },
    {
      icon: Phone,
      title: "Wa",
      description: "+62 31 1234 5678",
    },
    {
      icon: Mail,
      title: "Email",
      description: "hello@Platinum.id",
    },
  ];

  const menuItems: string[] = [
    "Home",
    "Membership",
    "Features",
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
                <Link to={'/auth'}>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-black font-bold py-4 px-8 rounded-full text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Play size={20} fill="currentColor" />
                    Register now
                  </motion.button>
                </Link>
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
              Platinum
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
              © 2025 Platinum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GymLandingPage;
