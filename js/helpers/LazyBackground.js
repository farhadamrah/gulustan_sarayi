import React, { useEffect, useState } from "react";

const LazyBackground = ({
    src,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
}) => {
    const [source, setSource] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setSource(src);
    }, [src]);

    return (
        <div
            className={className}
            style={{ backgroundImage: `${source ? `url(${source})` : "none"}` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default LazyBackground;
