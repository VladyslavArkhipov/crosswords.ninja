import styles from './policyPayments.module.css';

export default function TermsAndConditions() {
    return (
        <>
            <h2 className={styles.center} style={{ marginBottom: '16px' }}>Terms & Conditions</h2>
            <p className={`${styles.center} bodyL bodyLRegular`}>
                Welcome to Crosswords Ninja! These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, you accept these terms in full.
            </p>
            <p className={`${styles.center} bodyL bodyLRegular`} style={{ marginBottom: '32px' }}>
                If you disagree with any part of these terms, please do not use our website or services.
            </p>
            <ol className={`bodyL bodyLRegular ${styles.list}`}>
                <li>
                    <span className="bodyLBold">General Information:</span> Crosswords Ninja is operated by Sole Proprietor <span className='bodyLBold'>Burgyla Yulianna Eduardivna</span>  (ФОП Бургила Ю.Є.). By accessing our website, you agree to comply with and be bound by these Terms and Conditions.
                </li>
                <li>
                    <span className="bodyLBold">Services Provided:</span> Crosswords Ninja provides digital services for generating customizable crosswords. Access to these services is granted upon successful payment. All services are delivered digitally, and no physical products will be shipped.
                </li>
                <li>
                    <span className="bodyLBold">User Accounts:</span> To access certain features, users may need to create an account. Users are responsible for maintaining the confidentiality of their account information and are fully responsible for all activities under their account.
                </li>
                <li>
                    <span className="bodyLBold">Payment and Pricing:</span>
                    <ul className='bodyL bodyLRegular' style={{ paddingLeft: '16px' }}>
                        <li>All prices are listed in UAH (Ukrainian Hryvnia).</li>
                        <li>We reserve the right to change prices at any time without notice.</li>
                        <li>Payments are processed securely through third-party payment gateways.</li>
                    </ul>
                </li>
                <li>
                    <span className="bodyLBold">Delivery of Services:</span> Access to digital services is granted immediately upon successful payment confirmation. If you experience any issues with access, please contact us.
                </li>
                <li>
                    <span className="bodyLBold">Intellectual Property Rights:</span> All content provided on Crosswords Ninja, including text, graphics, logos, and software, is the property of Sole Proprietor Burgyla Yulianna Eduardivna and is protected by international copyright laws. Unauthorized use of our content is prohibited.
                </li>
                <li>
                    <span className="bodyLBold">Limitation of Liability:</span> We are not liable for any damages arising from the use or inability to use our services. Our maximum liability is limited to the amount paid for the service.
                </li>
                <li>
                    <span className="bodyLBold">Governing Law:</span> These Terms are governed by and construed in accordance with the laws of Ukraine.
                </li>
                <li>
                    <span className="bodyLBold">Amendments to Terms:</span> We reserve the right to update these terms at any time. Continued use of the service implies acceptance of the revised terms.
                </li>
            </ol>
        </>
    );
}