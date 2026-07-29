import PaymentCallback from "@/components/payment/payment-callback";

type CallbackSearchParams = Promise<{
  reference?: string | string[];
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
  const reference = firstValue(params.reference);
  const transactionReference = firstValue(params.trxref);
  const hasMismatchedReferences = Boolean(
    reference &&
      transactionReference &&
      reference !== transactionReference,
  );

  return (
    <main className="pt-28 md:pt-36">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-0 md:py-24">
        <PaymentCallback
          reference={reference ?? transactionReference ?? null}
          hasMismatchedReferences={hasMismatchedReferences}
        />
      </section>
    </main>
  );
}
