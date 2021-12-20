import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const btn = recipe({
  base: {
    borderRadius: 6,
    cursor: "pointer",
    textDecoration: 'none',
    border: 'none',
    fontSize: '2em',
    display: 'inline-block',
    fontFamily: vars.fonts.heading,
    textTransform: 'uppercase'
  },

  variants: {
    color: {
      neutral: fmc({ background: 'grey', color: 'black' }),
      brand: fmc({ background: 'blue', color: 'white' }),
      accent: fmc({ background: 'pink', color: 'white' })
    },
    size: {
      small: fmc({ padding: 'small' }),
      medium: fmc({ padding: 'medium' }),
      large: fmc({ padding: 'large' })
    },
    rounded: {
      true: { borderRadius: 999 }
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
    color: 'brand',
    size: 'small'
  }
})