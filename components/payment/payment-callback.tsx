"use client";

import { useVerifyPayment } from "@/hooks/payment/use-verify-payment";
import { AxiosError } from "axios";
import {
  ArrowRight,
  CircleAlert,
  Loader2,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface PaymentCallbackProps {
  reference: string | null;
  callbackStatus: string | null;
  transactionId: string | null;
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const detail = (error.response?.data as { detail?: unknown } | undefined)
      ?.detail;
    if (typeof detail === "string") return detail;
  }

  return "We could not confirm this payment. Please try again.";
};

const isSuccessfulCallbackStatus = (status: string | null) =>
  status?.toLowerCase() === "successful";

export default function PaymentCallback({
  reference,
  callbackStatus,
  transactionId,
}: PaymentCallbackProps) {
  const shouldVerify =
    Boolean(reference) &&
    (callbackStatus === null || isSuccessfulCallbackStatus(callbackStatus));

  const {
    data: payment,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useVerifyPayment(shouldVerify ? reference : null);

  const isSuccess = payment?.status === "success";
  const isFailure =
    payment?.status === "failed" || payment?.status === "abandoned";
  const isInvalidCallback = !reference;
  const callbackIndicatesFailure =
    callbackStatus !== null && !isSuccessfulCallbackStatus(callbackStatus);

  if (isLoading && shouldVerify) {
    return (
      <CallbackCard
        icon={<Loader2 className="h-10 w-10 animate-spin text-primary" />}
        title="Confirming your payment"
        description="Please keep this page open while we verify your Afripay transfer."
      />
    );
  }

  if (callbackIndicatesFailure && !payment) {
    return (
      <CallbackCard
        icon={<CircleAlert className="h-10 w-10 text-red-600" />}
        title="Payment was not completed"
        description="Afripay reported that this checkout did not complete successfully. You can return to your order and try again."
      >
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-2xl border border-primary px-5 py-3 font-semibold text-primary"
        >
          Return to shop
        </Link>
      </CallbackCard>
    );
  }

  if (isInvalidCallback || error) {
    return (
      <CallbackCard
        icon={<CircleAlert className="h-10 w-10 text-red-600" />}
        title="Payment could not be verified"
        description={
          isInvalidCallback
            ? "The payment reference in this callback is missing or invalid."
            : getErrorMessage(error)
        }
      >
        {!isInvalidCallback && (
          <button
            type="button"
            disabled={isFetching}
            onClick={() => refetch()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/80 disabled:opacity-60"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCw className="h-4 w-4" />
            )}
            Try verification again
          </button>
        )}
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-2xl border border-primary px-5 py-3 font-semibold text-primary"
        >
          Return to shop
        </Link>
      </CallbackCard>
    );
  }

  if (isSuccess) {
    return (
      <CallbackCard
        icon={<ShieldCheck className="h-10 w-10 text-green-600" />}
        title="Payment confirmed"
        description={
          transactionId
            ? `Your payment was successful and your order has been confirmed. Transaction ID: ${transactionId}.`
            : "Your payment was successful and your order has been confirmed."
        }
      >
        <Link
          href={`/orders/${payment.order_id}`}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/80"
        >
          View order
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CallbackCard>
    );
  }

  return (
    <CallbackCard
      icon={<CircleAlert className="h-10 w-10 text-amber-600" />}
      title={isFailure ? "Payment was not completed" : "Payment is still pending"}
      description={
        isFailure
          ? "Afripay did not complete this transaction. You can return to your order and try again."
          : "The transfer has not been confirmed yet. If you already paid, wait a moment and verify again."
      }
    >
      {!isFailure && (
        <button
          type="button"
          disabled={isFetching}
          onClick={() => refetch()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/80 disabled:opacity-60"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RotateCw className="h-4 w-4" />
          )}
          Check payment status
        </button>
      )}
      {payment && (
        <Link
          href={`/orders/${payment.order_id}`}
          className="inline-flex items-center justify-center rounded-2xl border border-primary px-5 py-3 font-semibold text-primary"
        >
          View order
        </Link>
      )}
    </CallbackCard>
  );
}

function CallbackCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-[32px] border border-[#F0F0F0] bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-foreground">
        {icon}
      </div>
      <p className="font-display text-sm text-primary">Secure checkout</p>
      <h1 className="mt-2 text-3xl text-primary md:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-secondary">{description}</p>
      {children && (
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {children}
        </div>
      )}
    </div>
  );
}
