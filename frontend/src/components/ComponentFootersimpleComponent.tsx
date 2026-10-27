import React from 'react';

type ComponentFootersimpleComponentProps = {
    data?: Record<string, any>;
};

export const ComponentFootersimpleComponent: React.FC<ComponentFootersimpleComponentProps> = ({ data = {} }) => {

    return (
        <>
<div className="container-fluid p-1 my-bg-color text-center text-white mt-3">
        <p className="fs-4 text-center"> &copy; md.talal.wasim</p>
        </div>
        </>
    );
};

export default ComponentFootersimpleComponent;