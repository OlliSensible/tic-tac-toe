import React from 'react';

function TabPanel({ children, value, index }) {
    return (
        <div>
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

export default TabPanel;