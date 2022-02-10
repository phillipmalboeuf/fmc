export const date = (value: string | Date, time=false, lang='fr') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...time && {
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    )
  : '–'

export const money = (value: number | string) => 
  value !== undefined && value !== null ? `$${parseFloat(value as string).toFixed(2)}` : `–`

export const types = (type: string, locale: string) => ({
  'fr': {
    'Signals': 'Signaux',
    'Scenario': 'Scénario',
    'Challenges & trailblazers': 'Opportunités'
  }[type]
}[locale] || {
  'Challenges & trailblazers': 'Opportunities'
}[type] || type)

export const backs = (color: string) => ({
  'pink': 'coral',
  'green': 'yellow',
  'blue': 'marin',
  'cyan': 'moss',
  'violet': 'coral',
}[color])

export const texts = (color: string) => ({
  'pink': 'white',
  'coral': 'black',
  'green': 'black',
  'yellow': 'black',
  'blue': 'white',
  'cyan': 'black',
  'marin': 'white',
  'moss': 'white',
  'violet': 'black',
}[color])

export const highlights = (color: string) => ({
  'violet': 'pink',
}[color])