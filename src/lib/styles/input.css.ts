import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'
import { backs, texts } from '$lib/formatters'

export const inpt = recipe({
  base: [{
    fontSize: '1.5rem',
    color: 'currentcolor',
    lineHeight: 1,
    display: 'block',
    border: 'none',
    borderBottom: '1px solid',
    width: 'auto',
    background: 'transparent',
    outline: 'none',
    selectors: {
      '&:active': {
        background: 'var(--hover-color)',
        // border: '1px solid transparent'
      },
      '&::placeholder': {
        color: 'currentcolor',
        opacity: 1,
        textTransform: 'uppercase'
      }
    }
  }],

})