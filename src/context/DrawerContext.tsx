import React, { createContext, useContext, useState } from "react";

interface DrawerContextValue {
    open: boolean;
    showDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const toggleDrawer = () => setOpen((s) => !s);

    return (
        <DrawerContext.Provider
            value={{ open, showDrawer, closeDrawer, toggleDrawer }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const ctx = useContext(DrawerContext);
    if (!ctx) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return ctx;
};

export default DrawerContext;
