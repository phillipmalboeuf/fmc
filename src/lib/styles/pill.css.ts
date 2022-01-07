import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const pills = recipe({
  base: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.5em',
    marginBottom: '1em'
  },
})

export const pill = recipe({
  base: {
    border: '1px solid',
    textTransform: 'uppercase',
    textDecoration: 'none'
  },

  variants: {
    clickable: {
      true: {
        selectors: {
          '&:hover, &:focus': {
            background: 'var(--color)',
            color: 'var(--text-color)',
            borderColor: 'transparent',
          }
        }
      }
    },
    padding: {
      none: { padding: 0 },
      small: { padding: '0.5em 0.5em 0.35em' },
    },
    corner: {
      small: { borderRadius: 6 },
      thick: { borderRadius: 12 }
    }
  },

  defaultVariants: {
    padding: 'small',
    corner: 'small'
  }
})