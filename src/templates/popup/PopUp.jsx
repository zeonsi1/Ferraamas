import {useRef, onClose} from "react";


function PopUp() {
    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

    return(
        <>
            <div ref={modalRef} onClick={closeModal}>
                <button onClick={onClose}>X</button>
            </div>
        </>
    );
}


export default PopUp;