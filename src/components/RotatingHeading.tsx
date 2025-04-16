'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = ['Welcome to GameHive','Discover Your Style', 'Upgrade Your Gear', "Immerse in the Hive"];

const RotatingHeading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl  font-bold text-[--foreground] mb-4"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingHeading;
