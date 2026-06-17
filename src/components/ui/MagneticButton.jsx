import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  as: Component = "button",
  intensity = 0.2,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      href={href}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
