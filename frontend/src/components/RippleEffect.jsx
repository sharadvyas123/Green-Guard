import React, { useState, useEffect } from 'react';

const RippleEffect = ({ children, className }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const clearRipples = () => {
      setRipples([]);
    };

    return () => {
      clearRipples();
    };
  }, []);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    const ripple = {
      x: (rect.width / 2),
      y: (rect.height / 2),
      diameter,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
    }, 1000);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] ${className}`}
      onMouseEnter={createRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            width: ripple.diameter + 'px',
            height: ripple.diameter + 'px',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute bg-white/30 rounded-full animate-ripple"
        />
      ))}
      {children}
    </div>
  );
};

export default RippleEffect;