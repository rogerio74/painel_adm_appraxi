import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import Modal from 'react-modal'
import { useModal } from '../../contexts/ModalContext'

interface IModalProps {
  children: ReactNode
  title: string
}

export const ModalComponent: React.FC<IModalProps> = ({ children, title }: IModalProps) => {
  const { openModal, handleOpenModal } = useModal()

  return (
    <Modal
      ariaHideApp={false}
      isOpen={openModal}
      closeTimeoutMS={200}
      onRequestClose={handleOpenModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="header_modal">
        <h2>{title}</h2>
        <button type="button" onClick={() => handleOpenModal()}>
          <MdClose />
        </button>
      </div>
      {children}
    </Modal>
  )
}
