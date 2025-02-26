"use client";
import styles from "./Footer.module.css"; // Импортируйте CSS-модуль
import { useState, useEffect } from "react";
import PolicyPayments from "@/components/policyPayments/policyPayments";

export default function Footer(props) {
  // Состояние для отслеживания открытых модальных окон
  const [isPrivacyPaymentsOpen, setIsPrivacyPaymentsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  // Состояние для определения типа устройства
  const [isMobile, setIsMobile] = useState(false);
  
  // Определение мобильного устройства на основе ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px - стандартная контрольная точка для мобильных
    };
    
    // Вызываем функцию при первой загрузке
    handleResize();
    
    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Обработчики для открытия/закрытия модальных окон
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

      {/* Модальное окно для Privacy Policy или Terms */}
      <PolicyPayments 
        isOpen={isPrivacyPaymentsOpen} 
        onClose={closePrivacyPayments} 
        typeOfModal={modalType}
      />
    </>
  );
}