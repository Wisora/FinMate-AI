import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface PayFastNotificationBody {
  m_payment_id?: string;
  pf_payment_id?: string;
  payment_status?: string;
  item_name?: string;
  amount_gross?: string;
  signature?: string;
  [key: string]: string | undefined;
}

export function generatePayFastSignature(
  data: Record<string, string>,
  passphrase?: string
): string {
  // 1. Omit signature parameter and empty strings
  const filteredKeys = Object.keys(data).filter(
    (key) => key !== 'signature' && data[key] !== '' && data[key] !== undefined
  );

  // 2. Format key-value parameters
  let pfParamString = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(data[key]!.trim()).replace(/%20/g, '+')}`)
    .join('&');

  // 3. Append salt passphrase if provided
  if (passphrase) {
    pfParamString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }

  // 4. Return MD5 Hash
  return crypto.createHash('md5').update(pfParamString).digest('hex');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const pfData = req.body as PayFastNotificationBody;
    const receivedSignature = pfData.signature;

    if (!receivedSignature) {
      return res.status(400).json({ error: 'Missing security signature' });
    }

    // Convert payload to key-value record
    const cleanData: Record<string, string> = {};
    Object.keys(pfData).forEach((key) => {
      if (pfData[key] !== undefined) {
        cleanData[key] = String(pfData[key]);
      }
    });

    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    const calculatedSignature = generatePayFastSignature(cleanData, passphrase);

    // Verify signature integrity
    if (calculatedSignature !== receivedSignature) {
      console.error('PayFast Signature Verification Failed');
      return res.status(400).json({ error: 'Invalid signature verification' });
    }

    // Check payment status from PayFast payload
    if (pfData.payment_status === 'COMPLETE') {
      // TODO: Update user subscription state to 'pro' in database
      console.log(`Payment SUCCESS for order: ${pfData.m_payment_id}`);
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling PayFast notification:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}