import { useState } from 'react'

const Modal = ({ children, id }) => {
  const [isActive, setActive] = useState(false)
  const modal = React.createRef()

  const closeModal = () => {
    setActive(false)
    modal.current.classList.remove('is-active')
  }

  return (
    <div id={id} className={isActive ? 'modal is-active' : 'modal'} ref={modal}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  )
}

export default Modal
