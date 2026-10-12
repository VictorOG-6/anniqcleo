import PaymentCallback from "@/components/payment/payment-callback";

type CallbackSearchParams = Promise<{
  status?: string | string[];
  reference?: string | string[];
  trx?: string | string[];
  /** Legacy Paystack redirect param */
  trxref?: string | string[];
}>;

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: CallbackSearchParams;
}) {
  const params = await searchParams;
  const callbackStatus = firstValue(params.status) ?? null;
  const reference =
    firstValue(params.reference) ??
    firstValue(params.trxref) ??
    null;
  const transactionId = firstValue(params.trx) ?? null;

  return (
    <main className="pt-28 md:pt-36">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-0 md:py-24">
        <PaymentCallback
          reference={reference}
          callbackStatus={callbackStatus}
          transactionId={transactionId}
        />
      </section>
    </main>
  );
}
