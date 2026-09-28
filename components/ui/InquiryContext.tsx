'use client';

import React, { createContext, useContext, useState } from 'react';
import InquiryModal from './InquiryModal';

interface InquiryContextType {
  openInquiry: (projectType?: string) => void;
  closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType>({
  openInquiry: () => {},
  closeInquiry: () => {},
});

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectType, setProjectType] = useState<string | undefined>();

  const openInquiry = (type?: string) => {
    setProjectType(type);
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
  };

  return (
    <InquiryContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}
      <InquiryModal
        isOpen={isOpen}
        onClose={closeInquiry}
        defaultProjectType={projectType}
      />
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  return useContext(InquiryContext);
}
