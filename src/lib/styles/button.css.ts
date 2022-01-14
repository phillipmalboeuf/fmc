import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'
import { backs, texts } from '$lib/formatters'

export const btn = recipe({
  base: [{
    borderRadius: 6,
    cursor: "pointer",
    textDecoration: 'none',
    lineHeight: 1,
    display: 'inline-block',
    border: '1px solid transparent',
    selectors: {
      '&:hover': {
        // background: 'var(--hover-color)',
        border: '1px solid transparent'
      }
    }
  }],

  variants: {
    hover: {
      green: { selectors: { '&:hover': { background: vars.colors['green'], color: vars.colors[texts('green')] } } },
      blue: { selectors: { '&:hover': { background: vars.colors['blue'], color: vars.colors[texts('blue')] } } },
      cyan: { selectors: { '&:hover': { background: vars.colors['cyan'], color: vars.colors[texts('cyan')]} } },
      pink: { selectors: { '&:hover': { background: vars.colors['pink'], color: vars.colors[texts('pink')] } } },
    },
    color: {
      outline: [fmc({ fontSize: 'big' }), { fontFamily: vars.fonts.heading, textTransform: 'uppercase', color: 'currentColor', background: 'transparent', border: '1px solid' }],
      // muted: fmc({ background: 'violet', color: 'white' }),
      green: [{ background: vars.colors['green'], color: vars.colors[texts('green')] }, { selectors: { 
        '&:hover': { color: vars.colors[texts(backs('green'))], background: vars.colors[backs('green')] } 
      }}],
      blue: [{ background: vars.colors['blue'], color: vars.colors[texts('blue')] }, { selectors: { 
        '&:hover': { color: vars.colors[texts(backs('blue'))], background: vars.colors[backs('blue')] } 
      }}],
      cyan: [{ background: vars.colors['cyan'], color: vars.colors[texts('cyan')] }, { selectors: { 
        '&:hover': { color: vars.colors[texts(backs('cyan'))], background: vars.colors[backs('cyan')] } 
      }}],
      pink: [{ background: vars.colors['pink'], color: vars.colors[texts('pink')] }, { selectors: { 
        '&:hover': { color: vars.colors[texts(backs('pink'))], background: vars.colors[backs('pink')] } 
      }}],
    },
    size: {
      small: fmc({ padding: 'small' }),
      medium: fmc({ padding: 'medium' }),
      large: fmc({ padding: 'large' })
    },
    rounded: {
      true: { borderRadius: 999 }
    },
    full: {
      true: { width: '100%', textAlign: 'center', marginBottom: '1rem',
      '@media': {
        'screen and (max-width: 888px)': {
          textAlign: 'left',
          selectors: {
            '&:after': {
              content: '↓',
              fontFamily: vars.fonts.body,
              float: 'right'
            }
          }
        }
      } }
    }
  },

  // Applied when multiple variants are set at once
  compoundVariants: [
  ],

  defaultVariants: {
    color: 'outline',
    size: 'small'
  }
})

globalStyle(`${btn} > div`, {
  fontSize: '',
  fontFamily: ''
})