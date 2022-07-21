import { useContext, useState } from "react";
import React from "react";

const SidebarContext = React.createContext();
const SidebarUpdateContext = React.createContext();
const SidebarUpdateContext2 = React.createContext();


export function useSidebar() {
    return useContext(SidebarContext)
}

export function useSidebarUpdate() {
    return useContext(SidebarUpdateContext)
}

export function useSidebarUpdate2() {
    return useContext(SidebarUpdateContext2)
}


export function SidebarProvider({ children }) {
    const [sidebar, setSidebar] = useState(false);

    function openSidebar() {
        setSidebar(!sidebar)
    }

    

    return (
        <SidebarContext.Provider value={sidebar}>
            <SidebarUpdateContext.Provider value={openSidebar}>
                {children}
            </SidebarUpdateContext.Provider>
        </SidebarContext.Provider>
    )
}