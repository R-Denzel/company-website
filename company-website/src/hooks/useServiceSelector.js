import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** State for the guided service selector, ending on the pre-filled contact form. */
export default function useServiceSelector() {
  const [state, setState] = useState({ isOpen: false, service: '' });
  const navigate = useNavigate();

  const open = (service = '') => {
    setState({ isOpen: true, service });
  };

  const close = () => setState((current) => ({ ...current, isOpen: false }));

  return {
    open,
    modalProps: {
      isOpen: state.isOpen,
      initialService: state.service,
      onClose: close,
      onContinue: ({ service, market, segment, stage, timeline }) => {
        close();
        navigate('/contact', {
          state: { enquiry: { service, market, segment, timeline, message: `Project stage: ${stage}\n\n` } },
        });
      },
    },
  };
}
