import emailjs from '@emailjs/browser';

// Initialize EmailJS with your service ID
// You'll need to set these environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;
const TEMPLATE_ID_PROPOSAL = import.meta.env.VITE_EMAILJS_TEMPLATE_PROPOSAL;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

/**
 * Send contact form email
 * @param {Object} formData - { name, email, subject, message }
 * @returns {Promise}
 */
export const sendContactEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID_CONTACT || !PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    reply_to: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'maledenzel@gmail.com',
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams);
};

/**
 * Send proposal form email
 * @param {Object} proposalData - { name, email, proposal, interest }
 * @returns {Promise}
 */
export const sendProposalEmail = async (proposalData) => {
  if (!SERVICE_ID || !TEMPLATE_ID_PROPOSAL || !PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  const templateParams = {
    from_name: proposalData.name,
    from_email: proposalData.email,
    reply_to: proposalData.email,
    interest_type: proposalData.interest,
    proposal_message: proposalData.proposal,
    to_email: 'maledenzel@gmail.com',
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID_PROPOSAL, templateParams);
};
