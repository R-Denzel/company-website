import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Handshake, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Send,
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';
import { sendProposalEmail } from '../utils/emailService';

const Opportunities = () => {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    name: '',
    email: '',
    proposal: '',
    interest: 'general',
  });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apps = [
    {
      id: 'handyman',
      name: 'Handyman App',
      description: 'A mobile and web platform connecting customers with verified handymen for home maintenance, repairs, and improvements. The app features real-time booking, ratings, and secure payments.',
      requirements: [
        'Mobile app development (React Native or Flutter)',
        'Web frontend (React/Next.js)',
        'Backend API development (Node.js/Python)',
        'Real-time features',
        'Payment integration',
      ],
      roles: ['Frontend Developer', 'Mobile Developer', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer'],
    },
    {
      id: 'aichat',
      name: 'AI Chat & Counsel App',
      description: 'An AI-powered chat application designed to support people during late-night hours, providing counseling, mentorship, and human connection. Uses advanced NLP and sentiment analysis to provide empathetic responses.',
      requirements: [
        'AI/ML expertise (NLP, chatbot development)',
        'Mobile and web development',
        'Real-time messaging infrastructure',
        'Database design for conversations',
        'Security & privacy implementation',
      ],
      roles: ['AI/ML Engineer', 'Full-stack Developer', 'Backend Developer', 'Mobile Developer', 'Data Scientist'],
    },
  ];

  const collaborationTypes = [
    {
      type: 'Internship',
      icon: Users,
      description: 'Learn and grow with us while contributing to real projects',
    },
    {
      type: 'Partnership',
      icon: Handshake,
      description: 'Collaborate as equals on projects that matter',
    },
    {
      type: 'Collaboration',
      icon: Lightbulb,
      description: 'Work together on specific features or components',
    },
  ];

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setProposalData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await sendProposalEmail(proposalData);
      setProposalSubmitted(true);
      setTimeout(() => {
        setShowProposalForm(false);
        setProposalSubmitted(false);
        setProposalData({
          name: '',
          email: '',
          proposal: '',
          interest: 'general',
        });
      }, 3000);
    } catch (err) {
      console.error('Error sending proposal:', err);
      setError('Failed to submit proposal. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
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
              Collaboration Opportunities
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're building innovative applications and looking for talented developers to collaborate with us on exciting projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* No Current Opportunities Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg"
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Opportunities At The Moment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We have some exciting applications under development and are actively looking for talented developers to collaborate with us. If you're interested in joining our team for any of these projects, submit your proposal below!
            </p>
            <Button
              variant="neon"
              size="lg"
              onClick={() => setShowProposalForm(true)}
            >
              Submit Your Proposal
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Apps Under Development */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Applications In Development
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're building these innovative solutions and actively seeking collaborators with specific expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-surface-light dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {app.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {app.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tech Stack & Requirements
                  </h4>
                  <ul className="space-y-3">
                    {app.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Open Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {app.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Types */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ways To Collaborate
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the collaboration model that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationTypes.map((collab, index) => {
              const Icon = collab.icon;
              return (
                <motion.div
                  key={collab.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {collab.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {collab.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proposal Form Modal */}
      {showProposalForm && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              {proposalSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Proposal Submitted!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for your interest. We'll review your proposal and get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Submit Your Proposal
                    </h2>
                    <button
                      onClick={() => setShowProposalForm(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleProposalSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={proposalData.name}
                          onChange={handleProposalChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={proposalData.email}
                          onChange={handleProposalChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type of Interest *
                      </label>
                      <select
                        name="interest"
                        value={proposalData.interest}
                        onChange={handleProposalChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="handyman">Handyman App Collaboration</option>
                        <option value="aichat">AI Chat App Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Proposal *
                      </label>
                      <textarea
                        name="proposal"
                        value={proposalData.proposal}
                        onChange={handleProposalChange}
                        required
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder="Tell us about your background, expertise, and what you'd like to contribute to this project..."
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-3 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-300">{error}</p>
                      </motion.div>
                    )}

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        variant="neon" 
                        size="lg" 
                        className="flex-1"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Submitting...' : 'Submit Proposal'}
                        <Send className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setShowProposalForm(false)}
                        disabled={isLoading}
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
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              If you're a talented developer looking for meaningful collaboration opportunities, we'd love to hear from you.
            </p>
            <Button
              variant="neon"
              size="lg"
              onClick={() => setShowProposalForm(true)}
            >
              Submit Your Proposal
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
