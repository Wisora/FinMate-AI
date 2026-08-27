import React from 'react';

interface PayFastButtonProps {
  merchantId: string;
  merchantKey: string;
  signature: string; // Generated securely on the backend
  returnUrl?: string;
  cancelUrl?: string;
  notifyUrl?: string;
  amount?: string;
  itemName?: string;
}

export default function PayFastButton({
  merchantId,
  merchantKey,
  signature,
  returnUrl = 'https://finmate-ai.vercel.app/success',
  cancelUrl = 'https://finmate-ai.vercel.app/cancel',
  notifyUrl = 'https://finmate-ai.vercel.app/api/payfast-notify',
  amount = '199.00',
  itemName = 'FinMate AI Premium Subscription',
}: PayFastButtonProps) {
  const payfastUrl =
    process.env.NEXT_PUBLIC_PAYFAST_ENV === 'live'
      ? 'https://www.payfast.co.za/eng/process'
      : 'https://sandbox.payfast.co.za/eng/process';

  return (
    <form action={payfastUrl} method="post">
      <input type="hidden" name="merchant_id" value={merchantId} />
      <input type="hidden" name="merchant_key" value={merchantKey} />
      <input type="hidden" name="subscription_type" value="1" />
      <input type="hidden" name="recurring_amount" value={amount} />
      <input type="hidden" name="frequency" value="3" /> {/* Monthly */}
      <input type="hidden" name="cycles" value="0" /> {/* Infinite */}
      <input type="hidden" name="item_name" value={itemName} />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="cancel_url" value={cancelUrl} />
      <input type="hidden" name="notify_url" value={notifyUrl} />
      <input type="hidden" name="signature" value={signature} />

      <button
        type="submit"
        className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
      >
        Subscribe with PayFast
      </button>
    </form>
  );
}