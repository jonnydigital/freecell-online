'use client';

import { useEffect } from 'react';
import { getHighContrast, applyHighContrast, getReducedMotion, applyReducedMotion } from '../lib/accessibility';

const AccessibilityInitializer = () => {
  useEffect(() => {
    applyHighContrast(getHighContrast());
    applyReducedMotion(getReducedMotion());
  }, []);

  return null;
};

export default AccessibilityInitializer;
