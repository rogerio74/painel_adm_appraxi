import { ReactNode, useState } from 'react';
import {useContext, createContext } from 'react';


    interface IProps{ 
       handleOpenModal: ()=>void,
       openModal: boolean,
    }
    interface ModalContextProviderProps{
        children: ReactNode;
    }
    const ModalContext = createContext({} as IProps);

function ModalProvider(props: ModalContextProviderProps){
    const [openModal, setOpenModal] = useState(false)
    function handleOpenModal(){
        setOpenModal(!openModal)
    }
    return(
        <ModalContext.Provider 
        value={{    
            openModal,
            handleOpenModal,
        }}
      >
        {props.children}
      </ModalContext.Provider>
    )
}

export const useModal = () => {
    const {handleOpenModal, openModal} = useContext(ModalContext);
    return {handleOpenModal, openModal }
}

export  {ModalProvider};