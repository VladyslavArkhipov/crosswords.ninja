"use client";
import styles from "./Footer.module.css";
import { useState, useEffect } from "react";
import PolicyPayments from "@/components/policyPayments/policyPayments";

export default function Footer(props) {
  const [isPrivacyPaymentsOpen, setIsPrivacyPaymentsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openPrivacyPayments = () => setIsPrivacyPaymentsOpen(true);
  const closePrivacyPayments = () => setIsPrivacyPaymentsOpen(false);

  function openModal(type) {
    setModalType(type);
    openPrivacyPayments();
  }

  return (
    <>
      <footer className={styles.footer}>
        <p
          className={`${
            props.isCrosswordGenerated ? styles.footer_light : styles.footer_dark
          } ${styles.default} bodyS bodySMedium`}
        >
          {isMobile ? "© 2024 Uxrs.team" : "© 2024 Uxrs.team, All Rights Reserved"}
        </p>
        <p 
          className={`${
            props.isCrosswordGenerated ? styles.footer_light : styles.footer_dark
          } ${styles.underline} bodyS bodySMedium`}
          onClick={() => openModal('privacy')}
          style={{ cursor: 'pointer' }}
        >
          Privacy Policy
        </p>
        <p 
          className={`${
            props.isCrosswordGenerated ? styles.footer_light : styles.footer_dark
          } ${styles.underline} bodyS bodySMedium`}
          onClick={() => openModal('terms')}
          style={{ cursor: 'pointer' }}
        >
          T&C's
        </p>
      </footer>

      <PolicyPayments 
        isOpen={isPrivacyPaymentsOpen} 
        onClose={closePrivacyPayments} 
        typeOfModal={modalType}
      />
    </>
  );
}