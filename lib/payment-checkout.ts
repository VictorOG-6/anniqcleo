import { Payment } from "@/types";

const DEFAULT_CHECKOUT_ORIGIN =
  process.env.NEXT_PUBLIC_AFRIPAY_CHECKOUT_ORIGIN ??
  "https://business.goafripay.com";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

const isGoAfripayHost = (hostname: string) =>
  hostname === "goafripay.com" || hostname.endsWith(".goafripay.com");

const isAllowedCheckoutUrl = (url: URL) => {
  if (url.protocol === "https:" && isGoAfripayHost(url.hostname)) {
    return true;
  }

  if (process.env.NODE_ENV === "production") {
    return false;
  }

  if (
    (url.protocol === "http:" || url.protocol === "https:") &&
    LOCAL_HOSTS.has(url.hostname)
  ) {
    return url.pathname.includes("/link/");
  }

  return false;
};

type PaymentCheckoutSource = Pick<Payment, "authorization_url"> & {
  checkout_url?: string | null;
  access_code?: string | null;
};

export const resolvePaymentCheckoutUrl = (
  payment: PaymentCheckoutSource,
): string | null => {
  const direct = payment.authorization_url ?? payment.checkout_url ?? null;
  if (direct?.trim()) {
    return direct.trim();
  }

  const token = payment.access_code?.trim();
  if (!token) {
    return null;
  }

  return `${DEFAULT_CHECKOUT_ORIGIN.replace(/\/$/, "")}/link/${token}`;
};

export const redirectToPaymentCheckout = (
  paymentOrUrl: PaymentCheckoutSource | string | null,
) => {
  const authorizationUrl =
    typeof paymentOrUrl === "string"
      ? paymentOrUrl
      : paymentOrUrl
        ? resolvePaymentCheckoutUrl(paymentOrUrl)
        : null;

  if (!authorizationUrl) {
    throw new Error("The payment provider did not return a checkout URL.");
  }

  let url: URL;
  try {
    url = new URL(authorizationUrl);
  } catch {
    throw new Error("The payment provider returned an invalid checkout URL.");
  }

  if (!isAllowedCheckoutUrl(url)) {
    throw new Error("The payment provider returned an invalid checkout URL.");
  }

  window.location.assign(url.toString());
};
