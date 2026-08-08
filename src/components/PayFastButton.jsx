export default function PayFastButton() {
  return (
    <form action="https://sandbox.payfast.co.za/eng/process" method="post">
      <input type="hidden" name="merchant_id" value={process.env.PAYFAST_MERCHANT_ID} />
      <input type="hidden" name="merchant_key" value={process.env.PAYFAST_MERCHANT_KEY} />
      <input type="hidden" name="subscription_type" value="1" />
      <input type="hidden" name="recurring_amount" value="199.00" />
      <input type="hidden" name="frequency" value="3" /> {/* monthly */}
      <input type="hidden" name="cycles" value="0" /> {/* infinite */}
      <input type="hidden" name="item_name" value="FinMate AI Premium Subscription" />
      <input type="hidden" name="return_url" value="https://finmate-ai.vercel.app/success" />
      <input type="hidden" name="cancel_url" value="https://finmate-ai.vercel.app/cancel" />
      <input type="hidden" name="notify_url" value="https://finmate-ai.vercel.app/api/payfast-notify" />
      <button type="submit">Subscribe with PayFast</button>
    </form>
  );
}
