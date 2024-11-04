import { createPortal } from 'react-dom';

import { ModalWrapper } from 'components';
import { useModalStore } from 'stores';
import type { ModalName } from 'types';

export const ModalRenderer = () => {
  const { closeModal, openedModals } = useModalStore();
  const element = document.getElementById('modal') as Element;

  const renderModal = Object.entries(openedModals).map(([modalName, modal]) => {
    const ModalComponent = modal.component;

    return (
      <ModalWrapper
        key={modalName}
        onClose={() => {
          closeModal(modalName as ModalName);
        }}
      >
        <ModalComponent
          onClose={() => {
            closeModal(modalName as ModalName);
          }}
        />
      </ModalWrapper>
    );
  });

  return createPortal(<>{renderModal}</>, element);
};
