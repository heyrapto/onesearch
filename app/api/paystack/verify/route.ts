import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { reference } = await request.json()

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
  }

  // Verify with Paystack
  const paystackRes = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )

  const paystackData = await paystackRes.json()

  if (!paystackRes.ok || paystackData.data?.status !== 'success') {
    return NextResponse.json({ error: 'Payment not verified' }, { status: 402 })
  }

  const data = paystackData.data
  const supabaseUserId =
    data.metadata?.custom_fields?.find(
      (f: { variable_name: string; value: string }) => f.variable_name === 'supabase_user_id'
    )?.value ?? null

  const supabase = await createServerClient()

  if (supabaseUserId) {
    await supabase
      .from('profiles')
      .update({ is_pro: true, pro_unlocked_at: new Date().toISOString() })
      .eq('id', supabaseUserId)
  }

  return NextResponse.json({ ok: true })
}
