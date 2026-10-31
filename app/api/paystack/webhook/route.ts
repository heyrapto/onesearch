import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('x-paystack-signature') ?? ''

  // Verify HMAC SHA512
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  if (event.event !== 'charge.success') {
    return NextResponse.json({ received: true })
  }

  const data = event.data
  const supabaseUserId =
    data.metadata?.custom_fields?.find(
      (f: { variable_name: string; value: string }) => f.variable_name === 'supabase_user_id'
    )?.value ?? null

  const supabase = await createServiceClient()

  // Record payment
  await supabase.from('payments').upsert(
    {
      paystack_reference: data.reference,
      user_id: supabaseUserId,
      amount_kobo: data.amount,
      status: data.status,
      channel: data.channel,
      customer_email: data.customer?.email,
      raw_payload: data,
      paid_at: data.paid_at,
    },
    { onConflict: 'paystack_reference' }
  )

  // Upgrade user to pro
  if (supabaseUserId) {
    await supabase
      .from('profiles')
      .update({ is_pro: true, pro_unlocked_at: new Date().toISOString() })
      .eq('id', supabaseUserId)
  }

  return NextResponse.json({ received: true })
}
