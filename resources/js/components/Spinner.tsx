import React from "react";

const Spinner = () => {
    return (
        <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-cyan-600 rounded-full dark:text-cyan-500"
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
