import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query

  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('username', username)
    .single()

  if (error) return res.status(404).json({ error: 'Not found' })
  return res.status(200).json(data)
}
