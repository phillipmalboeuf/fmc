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

globalStyle(`${box} .close`, {
  position: 'absolute',
  top: '0.5em',
  right: '0.5em'
})