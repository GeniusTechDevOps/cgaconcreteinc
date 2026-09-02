import React, { useEffect, useRef, useState } from 'react';

interface AnimatedProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';
  duration?: string; // Clases de Tailwind: duration-700, duration-1000, etc.
  delay?: string;    // Clases de Tailwind: delay-200, delay-500, etc.
  once?: boolean;    // Si se anima solo la primera vez o cada vez que aparece
  styles?: string;   // Clases de Tailwind adicionales
}

const Animated: React.FC<AnimatedProps> = ({
  children,
  variant = 'fade-up',
  duration = 'duration-1000',
  delay = 'delay-0',
  once = true,
  styles = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si solo queremos que se anime una vez, dejamos de observar
          if (once) observer.unobserve(entry.target);
        } else {
          // Si once es false, reiniciamos el estado al salir de pantalla
          if (!once) setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px', // Pequeño margen para que no se active justo en el borde
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [once]);

  // Diccionario de estados iniciales (antes de la animación)
  const variants = {
    'fade-up': 'translate-y-12 opacity-0',
    'fade-down': '-translate-y-12 opacity-0',
    'fade-left': 'translate-x-12 opacity-0',
    'fade-right': '-translate-x-12 opacity-0',
    'zoom-in': 'scale-90 opacity-0',
  };

  // Clases cuando el elemento ya es visible
  const visibleClasses = 'translate-y-0 translate-x-0 scale-100 opacity-100';

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out w-full ${styles} ${duration} ${delay} ${isVisible ? visibleClasses : variants[variant]
        }`}
    >
      {children}
    </div>
  );
};

export default Animated;