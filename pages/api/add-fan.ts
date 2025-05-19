import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { artistId, fullName, email, phone } = req.body

  const { error } = await supabase.from('fans').insert({
    artist_id: artistId,
    full_name: fullName,
    email,
    phone,
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'Fan added!' })
}