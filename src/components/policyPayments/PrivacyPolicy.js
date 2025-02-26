import styles from './policyPayments.module.css'
export default function PrivacyPolicy() {
    return (
        <>
            <h2 className={styles.center} style={{marginBottom: 16 + 'px'}}>Privacy Policy</h2>
            <p className={`${styles.center} bodyL bodyLRegular`}>At Crosswords Ninja, we are committed to protecting your privacy. </p>
            <p className={`${styles.center} bodyL bodyLRegular`} style={{marginBottom: 32 + 'px'}}>This Privacy Policy explains how we collect, use, and protect your personal information.</p>
            <ol className={` bodyL bodyLRegular ${styles.list}`}>
                    <li>
                    <span className="bodyLBold">Information We Collect</span>
                    <ul className='bodyL bodyLRegular'  style={{paddingLeft: 5+'px'}}>
                        <li className='bodyL bodyLRegular'><strong>Personal Information:</strong> When you register or purchase services, we may collect personal details such as name, email address, and payment information.</li>
                        <li className='bodyL bodyLRegular'><strong>Usage Data:</strong> We may collect information on how you access and use our website, including IP address, browser type, and usage patterns.</li>
                    </ul>
                </li>
                <li>
                    <span className="bodyLBold">How We Use Your Information</span>
                    <ul className='bodyL bodyLRegular' style={{paddingLeft: 5+'px'}}>
                        <li>Provide and maintain our services</li>
                        <li>Process payments and manage orders</li>
                        <li>Improve our website and user experience</li>
                        <li>Communicate with you about updates, promotions, and support</li>
                    </ul>
                </li>
                <li><span className="bodyLBold">Data Security:</span> We implement appropriate security measures to protect your personal data. However, no method of transmission over the internet is 100% secure.</li>
                <li><span className="bodyLBold">Sharing of Information:</span> We do not sell or share your personal information with third parties, except as necessary to process payments or comply with legal obligations.</li>
                <li><span className="bodyLBold">Third-Party Links:</span> Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites.</li>
                <li><span className="bodyLBold">User Rights:</span> You have the right to access, update, or delete your personal information at any time by contacting us.</li>
                <li><span className="bodyLBold">Changes to Privacy Policy:</span> We may update our Privacy Policy periodically. Changes will be posted on this page.</li>
            </ol>

            <h2 className={styles.center} style={{marginBottom: 16 + 'px'}}>Refund Policy</h2>
            <p className={`${styles.center} bodyL bodyLRegular`}>At Crosswords Ninja, we are committed to protecting your privacy. </p>
            <p className={`${styles.center} bodyL bodyLRegular`} style={{marginBottom: 32 + 'px'}}>
            This Privacy Policy explains how we collect, use, and protect your personal information.</p>
            <ol className={` bodyL bodyLRegular ${styles.list}`}>
                <li><span className="bodyLBold">No Refunds:</span> All sales are final. We do not offer refunds, exchanges, or cancellations once the service is accessed.</li>
                <li>
                    <span className="bodyLBold">Exceptions:</span>
                    <ul className='bodyL bodyLRegular'  style={{paddingLeft: 5+'px'}}>
                        <li>If a technical issue on our side prevents you from accessing the service, please contact us within 7 days of purchase for assistance.</li>
                        <li>In the case of duplicate payments, please provide proof of transaction, and we will process a refund for the duplicate charge.</li>
                    </ul>
                </li>
                <li>
                    <span className="bodyLBold">Contact Information for Refund Requests:</span>
                    <ul className='bodyL bodyLRegular'  style={{paddingLeft: 5+'px'}}>
                        <li>Phone:<span className='bodyLBold'> +380935971605</span></li>
                        <li>Email:<span className='bodyLBold'> yuliannamelnyk94@gmail.com</span></li>
                        <li>Website: <a href="https://crosswords-ninja.vercel.app/"> [https://crosswords-ninja.vercel.app/]</a></li>
                    </ul>
                </li>
            </ol>

            <h2 className={styles.center} style={{marginBottom: 16 + 'px'}}>Contact Information</h2>
            <p className={`${styles.center} bodyL bodyLRegular`} style={{marginBottom: 32 + 'px'}}>For any questions, concerns, or support requests, please contact us using the details below:</p>
            <div className={styles.contact}>
                <p className='bodyL bodyLRegular'><strong>Business Name:</strong> Sole Proprietor: <span className='bodyLBold'> Burgyla Yulianna Eduardivna </span> (ФОП Бургила Ю.Є.)</p>
                <p className='bodyL bodyLRegular'>Phone: <span className='bodyLBold'>+380935971605</span></p>
                <p className='bodyL bodyLRegular'>Email:<span className='bodyLBold'> yuliannamelnyk94@gmail.com</span></p>
                <p className='bodyL bodyLRegular'>Website: <a color='rgba(255, 199, 0, 1)' href="https://crosswords-ninja.vercel.app/"> [https://crosswords-ninja.vercel.app/]</a></p>
                <p className='bodyL bodyLRegular' style={{marginBottom: 32 + 'px'}}>Legal Address: <span className='bodyLBold'> [Your Legal Address]</span></p>
                <p className='bodyL bodyLBold'>Thank you for choosing Crosswords Ninja!</p>
            </div>
            
        </>
    );
}
