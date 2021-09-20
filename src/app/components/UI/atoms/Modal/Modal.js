import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import useOnClickOutside from 'app/hooks/useOnClickOutside';

const modalRoot = document.getElementById('modal-root');
const element = document.createElement('div');

const ModalOuter = ({ children }) => {
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  return createPortal(children, element);
};

const Modal = ({ children, onCloseModal, isModalOpen }) => {
  const ref = useRef();
  const element = document.createElement('div');
  useOnClickOutside(ref, onCloseModal);

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalOuter>
      {isModalOpen && (
        <div className="modal__wrapper">
          <section ref={ref} className="modal__container">
            {children}
          </section>
        </div>
      )}
    </ModalOuter>
  );
};

Modal.defaultProps = {
  isModalOpen: false,
  onCloseModal: () => {},
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default Modal;
