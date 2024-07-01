import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      orderReference,
      orderDate,
      amount,
      currency,
      merchantAccount,
      merchantDomainName,
      merchantTransactionSecureType,
      productName,
      productPrice,
      productCount,
      clientFirstName,
      clientLastName,
      clientEmail,
      clientPhone,
    } = req.body;

    // Убедитесь, что все необходимые параметры переданы
    if (
      !orderReference ||
      !orderDate ||
      !amount ||
      !currency ||
      !merchantAccount ||
      !merchantDomainName ||
      !merchantTransactionSecureType ||
      !productName ||
      !productPrice ||
      !productCount ||
      !clientFirstName ||
      !clientLastName ||
      !clientEmail ||
      !clientPhone
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const secretKey = "7862ddd38cb6b88428bf1f8cc1c828f1e415a8f1"; // Замените на ваш реальный секретный ключ

    // Создание строки для подписи
    const signatureString = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${clientEmail};${clientPhone};${productName.join(
      ";"
    )};${productCount.join(";")};${productPrice.join(";")}`;
    const merchantSignature = crypto
      .createHash("md5")
      .update(signatureString + secretKey)
      .digest("hex");

    const paymentUrl = "https://secure.wayforpay.com/pay";
    const paymentParams = {
      merchantAccount,
      merchantDomainName,
      merchantSignature,
      orderReference,
      orderDate,
      amount,
      currency,
      productName,
      productPrice,
      productCount,
      clientFirstName,
      clientLastName,
      clientEmail,
      clientPhone,
      merchantTransactionSecureType,
    };

    return res.status(200).json({
      success: true,
      payment_url: paymentUrl,
      payment_params: paymentParams,
    });
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
