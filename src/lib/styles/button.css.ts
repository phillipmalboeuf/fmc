import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

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
      green: { selectors: { '&:hover': { background: vars.colors.green, color: vars.colors.black } } },
      blue: { selectors: { '&:hover': { background: vars.colors.blue } } },
      cyan: { selectors: { '&:hover': { background: vars.colors.cyan, color: vars.colors.black } } },
      pink: { selectors: { '&:hover': { background: vars.colors.pink } } },
    },
    color: {
      outline: [fmc({ fontSize: 'big' }), { fontFamily: vars.fonts.heading, textTransform: 'uppercase', color: 'currentColor', background: 'transparent', border: '1px solid' }],
      // muted: fmc({ background: 'violet', color: 'white' }),
      green: [fmc({ background: 'pink', color: 'black' }), { selectors: { 
        '&:hover': { color: vars.colors.white, background: vars.colors.yellow } 
      }}],
      blue: [fmc({ background: 'pink', color: 'white' }), { selectors: { 
        '&:hover': { color: vars.colors.black, background: vars.colors.marin } 
      }}],
      cyan: [fmc({ background: 'cyan', color: 'black' }), { selectors: { 
        '&:hover': { color: vars.colors.white, background: vars.colors.moss } 
      }}],
      pink: [fmc({ background: 'pink', color: 'white' }), { selectors: { 
        '&:hover': { color: vars.colors.black, background: vars.colors.coral } 
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
      true: { width: '100%', textAlign: 'center', marginBottom: '1rem' }
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