import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Send, 
  Globe,
  Smartphone,
  Zap,
  Palette,
  Database,
  Code,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Button from '../components/Button';

const Projects = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTitle: '',
    description: '',
    category: 'web',
    budget: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'web', name: 'Web Development', icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
    { id: 'ai', name: 'AI/ML Solution', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'design', name: 'UI/UX Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { id: 'backend', name: 'Backend System', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'other', name: 'Other', icon: Code, color: 'from-gray-500 to-slate-500' },
  ];

  const ourServices = [
    {
      icon: Globe,
      name: 'Web & Mobile Development',
      description: 'Digital platforms, dashboards, and mobile applications tailored for businesses and institutions.',
    },
    {
      icon: Code,
      name: 'Custom Software Solutions',
      description: 'Locally relevant digital systems aligned to your specific operational workflows.',
    },
    {
      icon: Zap,
      name: 'AI-Assisted Automation',
      description: 'AI-powered tools for workflow automation, data processing, and service delivery.',
    },
    {
      icon: Database,
      name: 'Digital Payment & POS Software',
      description: 'Transaction and POS systems integrated with mobile money and digital payments.',
    },
    {
      icon: Palette,
      name: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that enhance user experience and engagement.',
    },
    {
      icon: Smartphone,
      name: 'Cloud-Based Solutions (Coming Soon)',
      description: 'Secure deployment, hosting, and management of cloud applications and data systems.',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project inquiry submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setShowProjectForm(false);
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        projectTitle: '',
        description: '',
        category: 'web',
        budget: '',
        timeline: '',
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Our Work & Expertise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We specialize in building innovative solutions across web, mobile, AI, and design. Let's bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering businesses with innovative technology solutions - from concept to launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ourServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-surface-light dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Portfolio
            </h2>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Under Maintenance
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                  We're currently updating our portfolio with our latest projects and case studies. Check back soon to see our amazing work!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Inquiry CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Tell us about your idea and let's discuss how we can bring it to life.
            </p>
            <Button
              variant="neon"
              size="lg"
              onClick={() => setShowProjectForm(true)}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Inquiry Form Modal */}
      {showProjectForm && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full my-8"
          >
            <div className="p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Thank you for your interest in working with us.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We'll get back to you within 24-48 hours to discuss your project in detail.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Project Inquiry
                    </h2>
                    <button
                      onClick={() => setShowProjectForm(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., E-Commerce Platform"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Project Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Timeline *
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-2months">1-2 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6plus">6+ months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range (optional)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under5k">Under $5,000</option>
                        <option value="5-10k">$5,000 - $10,000</option>
                        <option value="10-25k">$10,000 - $25,000</option>
                        <option value="25-50k">$25,000 - $50,000</option>
                        <option value="50plus">$50,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button type="submit" variant="neon" size="lg" className="flex-1">
                        Send Inquiry
                        <Send className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setShowProjectForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Get in touch and let's discuss your vision.
            </p>
            <Link to="/contact">
              <Button variant="neon" size="lg">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
