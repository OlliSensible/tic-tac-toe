import React from 'react';

function Tab({ label, setActiveTab, index }) {

    return (
        <button className="tab" onClick={() => setActiveTab(index)}>
            {label}
        </button>
    );
}

export default Tab;