import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Zap
} from 'lucide-react';

const About = () => {
  const mission = {
    icon: Target,
    title: 'Mission',
    description: 'To empower businesses and individuals with cutting-edge technology solutions that drive innovation, efficiency, and growth in an ever-evolving digital landscape.',
  };

  const vision = {
    icon: Eye,
    title: 'Vision',
    description: 'To be the leading catalyst for technological transformation, creating a future where innovative ideas seamlessly become reality through our expertise and passion.',
  };

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are driven by our love for technology and innovation.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and shared vision.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new possibilities.',
    },
  ];

  const timeline = [
    {
      year: '2024 ',
      title: 'Company  Founded',
      description: 'FutureTech was established with a vision to revolutionize the tech industry.',
      icon: Zap,
    },
    {
      year: '2024',
      title: 'First Major Project',
      description: 'Successfully delivered our first enterprise-level solution and Professional business website platforms.',
      icon: TrendingUp,
    },
    {
      year: '2025',
      title: 'Team Expansion',
      description: 'Grew our team of  talented professionals across multiple disciplines.',
      icon: Users,
    },
    {
      year: '2025',
      title: 'AI Integration',
      description: 'Launched our AI automation services, helping businesses streamline operations.',
      icon: Lightbulb,
    },
    {
      year: '2025',
      title: 'Global Reach',
      description: 'Expanded our services internationally, serving clients across different countries.',
      icon: Award,
    },
  ];

  const team = [
    {
      name: 'Denzel Robert Male',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader and developer in tech innovation.',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Jeremy Kasule ',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Tech architect passionate about scalable solutions.',
      social: {
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Hindu Nalubega ',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Creative director focused on user experience excellence.',
      social: {
        linkedin: '#',
        dribbble: '#',
      },
    },
    {
      name: 'Birungi Jannie',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack developer with expertise in modern frameworks.',
      social: {
        linkedin: '#',
        github: '#',
      },
    },
  ];

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
              About FutureTech
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're more than just a technology company. We're dreamers, builders, 
              and innovators committed to shaping the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <mission.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {mission.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {mission.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                <vision.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {vision.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {vision.description}
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to becoming a leader in technology innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary-500">{item.year}</div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-primary-500 rounded-full"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The brilliant minds behind FutureTech's success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary-500 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Empowering businesses with innovative technology solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Web & Mobile Application Development',
                description: 'Design and development of digital platforms, dashboards, and mobile applications tailored for SMEs, institutions, and public service use.',
              },
              {
                title: 'Custom Software Solutions',
                description: 'Development of locally relevant digital systems aligned to specific operational workflows.',
              },
              {
                title: 'AI-Assisted Automation',
                description: 'Deployment of AI-powered tools for workflow automation, data processing, and service delivery support.',
              },
              {
                title: 'Digital Payment & POS Software',
                description: 'Software-based transaction and POS systems integrated with mobile money and digital payments.',
              },
              {
                title: 'Cloud-Based Solutions',
                description: 'Secure deployment, hosting, and management of cloud-based applications and data systems using trusted infrastructure providers.',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-white/90">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
