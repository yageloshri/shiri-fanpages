import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function FanPage() {
  const { query } = useRouter()
  const [artist, setArtist] = useState<any>(null)

  useEffect(() => {
    if (!query.username) return
    fetch(`/api/artist-by-username?username=${query.username}`)
      .then(res => res.json())
      .then(setArtist)
  }, [query.username])

  if (!artist) return <div>טוען...</div>

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>הצטרפו לקהל של {artist.name}</h1>
      <form method="POST" action="/api/add-fan">
        <input name="artistId" type="hidden" value={artist.id} />
        <input name="fullName" placeholder="שם מלא" required />
        <input name="email" placeholder="מייל" required />
        <input name="phone" placeholder="טלפון" required />
        <button type="submit">להצטרפות</button>
      </form>
    </main>
  )
}