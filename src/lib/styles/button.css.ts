import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const btn = recipe({
  base: [fmc({ fontSize: 'big' }), {
    borderRadius: 6,
    cursor: "pointer",
    textDecoration: 'none',
    lineHeight: 1,
    border: 'none',
    display: 'inline-block',
    fontFamily: vars.fonts.heading,
    textTransform: 'uppercase',
    selectors: {
      '&:hover': {
        // background: 'var(--hover-color)',
        border: '1px solid transparent'
      }
    }
  }],

  variants: {
    color: {
      outline: [fmc({ color: 'white' }), { background: 'transparent', border: '1px solid' }],
      muted: fmc({ background: 'violet', color: 'white' }),
    },
    hover: {
      green: { selectors: { '&:hover': { background: vars.colors.green, color: vars.colors.black } } },
      blue: { selectors: { '&:hover': { background: vars.colors.blue } } },
      cyan: { selectors: { '&:hover': { background: vars.colors.cyan, color: vars.colors.black } } },
      pink: { selectors: { '&:hover': { background: vars.colors.pink } } },
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
      true: { width: '100%', textAlign: 'center', marginBottom: vars.space.small }
    }
  },

  // Applied when multiple variants are set at once
  compoundVariants: [
    // {
    //   variants: {
    //     color: 'neutral',
    //     size: 'large'
    //   },
    //   style: {
    //     background: 'ghostwhite'
    //   }
    // }
  ],

  defaultVariants: {
    color: 'outline',
    size: 'small'
  }
})