import React from "react";
const Loader = () => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';

    return (
        <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span hidden className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
};

export default Loader;