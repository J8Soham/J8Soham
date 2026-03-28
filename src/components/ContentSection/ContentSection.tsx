import { useEffect, useRef, useState, type ReactNode } from 'react';
import './ContentSection.css';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

export default function ContentSection({ children, className = '' }: ContentSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only reveal once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={ref} 
      className={`content-section ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
