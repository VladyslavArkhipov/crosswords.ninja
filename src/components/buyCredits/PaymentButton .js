import CryptoJS from "crypto-js";
import styles from "./BuyCreditsContent.module.css";

export default function PaymentButton({ choosedGenerations, user }) {
  const orderReference =
    Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  const orderDate = Math.floor(
    new Date("2023-07-01T00:00:00Z").getTime() / 1000
  );
  const amount = choosedGenerations.price;
  const productName = `${choosedGenerations.generations} generations`;

  const signatureString = `crosswords_ninja_vercel_app;https://crosswords-ninja.vercel.app/;${orderReference};${orderDate};${amount};USD;${productName};1;1`;
  const secretKey = "7862ddd38cb6b88428bf1f8cc1c828f1e415a8f1";
  const merchantSignature = CryptoJS.HmacMD5(
    signatureString,
    secretKey
  ).toString(CryptoJS.enc.Hex);

  return (
    <form method="post" action="https://secure.wayforpay.com/pay">
      <input
        type="hidden"
        name="merchantAccount"
        value="crosswords_ninja_vercel_app"
      />
      <input type="hidden" name="merchantAuthType" value="SimpleSignature" />
      <input
        type="hidden"
        name="merchantDomainName"
        value="https://crosswords-ninja.vercel.app/"
      />
      <input type="hidden" name="orderReference" value={orderReference} />
      <input type="hidden" name="orderDate" value={orderDate} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value="USD" />
      <input type="hidden" name="productName[]" value={productName} />
      <input type="hidden" name="productPrice[]" value="1" />
      <input type="hidden" name="productCount[]" value="1" />
      <input type="hidden" name="defaultPaymentSystem" value="card" />
      <input type="hidden" name="clientEmail" value={user.email} />
      <input type="hidden" name="merchantSignature" value={merchantSignature} />
      <input
        className={`${styles.button} ${styles.buy} bodyL bodyLBold`}
        type="submit"
        value="Buy generations"
      />
    </form>
  );
}
