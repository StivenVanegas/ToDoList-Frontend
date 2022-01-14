import React, { useState } from "react";

const show = false;
const initialData = { show };
const ModalContext = React.createContext(initialData);

export const ModalProvider = ({children}) => {
    const [modal, setModal] = useState(initialData);
    const value = {modal, setModal};
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export const useModal = () => {
    const context = React.useContext(ModalContext);
    return context;
}