import React from 'react';
import './LoadingButton.css';

const LoadingButton = ({ isLoading, children }) => {
    return (
        <button
            type='submit'
            className={`loading-button`}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="spinner"></span>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;