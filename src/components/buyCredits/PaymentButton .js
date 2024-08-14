import CryptoJS from "crypto-js";
import styles from "./BuyCreditsContent.module.css";

export default function PaymentButton(props) {
  const merchantAccount = "crosswords_ninja_vercel_app";
  const merchantDomainName = "https://crosswords-ninja.vercel.app/";
  const orderReference =
    Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  const specificDate = new Date("2023-07-01T00:00:00Z");
  const orderDate = Math.floor(specificDate.getTime() / 1000);
  const amount = props.choosedGenerations.price;
  const productName = `${props.choosedGenerations.generations} generations`;
  const productCount = "1";
  const productPrice = props.choosedGenerations.price;

  const tryString = `crosswords_ninja_vercel_app;https://crosswords-ninja.vercel.app/;${orderReference};${orderDate};${amount};USD;${productName};1;1`;
  const trySecretKey = "7862ddd38cb6b88428bf1f8cc1c828f1e415a8f1";
  const tryHmac = CryptoJS.HmacMD5(tryString, trySecretKey);
  const tryMerchantSignature = tryHmac.toString(CryptoJS.enc.Hex);
  console.log(props);
  return (
    <>
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
        <input
          type="hidden"
          name="merchantSignature"
          value={tryMerchantSignature}
        />
        <input
          className={`${styles.button} ${styles.buy} bodyL bodyLBold`}
          type="submit"
          value="Buy generations"
        />
      </form>
    </>
  );
}
