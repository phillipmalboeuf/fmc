import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const box = recipe({
  base: [fmc({ background: 'white', color: 'black' }), {
    borderRadius: 6,
    position: 'relative',
    marginBottom: '1rem',
    // border: '1px solid transparent',
    overflow: 'hidden'
  }],

  variants: {
    color: {
      muted: fmc({ background: 'offwhite' }),
      green: fmc({ background: 'green', color: 'black' }),
      blue: fmc({ background: 'blue' }),
      cyan: fmc({ background: 'cyan', color: 'black' }),
      pink: fmc({ background: 'pink' }),
      coral: fmc({ background: 'coral', color: 'black' }),
      grey: fmc({ background: 'grey', color: 'white' }),
    },
    padding: {
      none: { padding: 0 },
      tight: { padding: '1rem' },
      small: fmc({ padding: 'small' }),
    },
  },

  defaultVariants: {
    padding: 'small'
  }
})