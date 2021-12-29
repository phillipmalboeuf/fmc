import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const pills = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1em'
  },
})

export const pill = recipe({
  base: {
    borderRadius: 6,
    border: '1px solid',
    margin: '0 0.5em 0.5em 0',
    textTransform: 'uppercase'
  },

  variants: {
    padding: {
      none: { padding: 0 },
      small: { padding: '0.5em' },
    },
  },

  defaultVariants: {
    padding: 'small'
  }
})