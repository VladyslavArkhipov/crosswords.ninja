import CryptoJS from "crypto-js";

export default function PaymentButton() {
  const merchantAccount = "crosswords_ninja_vercel_app";
  const merchantDomainName = "https://crosswords-ninja.vercel.app/";
  const orderReference =
    Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  const specificDate = new Date("2023-07-01T00:00:00Z");
  const orderDate = Math.floor(specificDate.getTime() / 1000);
  const amount = "1";
  const currency = "UAH";
  const productName = "10 generations";
  const productCount = "1";
  const productPrice = "1";

  const tryString = `crosswords_ninja_vercel_app;https://crosswords-ninja.vercel.app/;${orderReference};${orderDate};2;USD;10 generations;1;2`;
  const trySecretKey = "7862ddd38cb6b88428bf1f8cc1c828f1e415a8f1";
  const tryHmac = CryptoJS.HmacMD5(tryString, trySecretKey);
  console.log(tryHmac);
  const tryMerchantSignature = tryHmac.toString(CryptoJS.enc.Hex);
  console.log(tryMerchantSignature);

  return (
    <>
      <form
        method="post"
        action="https://secure.wayforpay.com/pay"
        accept-charset="utf-8"
      >
        <input name="merchantAccount" value="crosswords_ninja_vercel_app" />
        <input name="merchantAuthType" value="SimpleSignature" />
        <input
          name="merchantDomainName"
          value="https://crosswords-ninja.vercel.app/"
        />
        <input name="orderReference" value={orderReference} />
        <input name="orderDate" value={orderDate} />
        <input name="amount" value="2" />
        <input name="currency" value="USD" />

        <input name="productName[]" value="10 generations" />
        <input name="productPrice[]" value="2" />
        <input name="productCount[]" value="1" />
        <input name="defaultPaymentSystem" value="card" />
        <input name="merchantSignature" value={tryMerchantSignature} />
        <input type="submit" value="Test" />
      </form>
    </>
  );
}
