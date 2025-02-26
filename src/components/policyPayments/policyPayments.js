import styles from "./policyPayments.module.css"
import Link from "next/link";
import Close from "@/assets/Close";
import BackButton from "../common/Buttons/BackButton";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";


export default function PolicyPayments({isOpen, onClose, typeOfModal}) {
    if (!isOpen) return null;
    
    
    const modalText = typeOfModal === 'privacy' ? <PrivacyPolicy/> : <TermsConditions/>;
    
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
            <button onClick={onClose} className={styles.closeModal}>
                        <Close color="black" />
                    </button>
                    </div>
                <div className={styles.modalBody}>
                    
                    {modalText}
                </div>
                <div className={styles.modalFooter}>
                <button onClick={onClose} className={`${styles.closeModalFooterButton} bodyL bodyLBold`}>
                    Close
                    </button>
                </div>
            </div>
        </div>
    );
}