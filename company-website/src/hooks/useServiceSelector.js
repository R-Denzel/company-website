import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** State for the guided service selector, ending on the pre-filled contact form. */
export default function useServiceSelector() {
  const [state, setState] = useState({ isOpen: false, service: '', selectedPackage: null });
  const navigate = useNavigate();

  const open = (service = '', selectedPackage = null) => {
    setState({ isOpen: true, service, selectedPackage });
  };

  const close = () => setState((current) => ({ ...current, isOpen: false }));

  return {
    open,
    modalProps: {
      isOpen: state.isOpen,
      initialService: state.service,
      initialPackage: state.selectedPackage,
      onClose: close,
      onContinue: (project) => {
        close();
        navigate('/contact', { state: { serviceInquiry: project } });
      },
    },
  };
}
