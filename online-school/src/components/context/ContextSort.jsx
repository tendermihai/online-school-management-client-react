import React, { useState, useContext } from "react";

export const ContextSort = React.createContext();
export const useSortContext = () => {
    return useContext(ContextSort);
}

const SortProvider = ({ children }) => {
    const [sortOption, setSortOption] = useState("id");

    const handleSort = (selectedSortOption) => {
        setSortOption(selectedSortOption);
    };

    return (
        <ContextSort.Provider value={{ sortOption, handleSort }}>
            {children}
        </ContextSort.Provider>
    );
};

export default SortProvider;
