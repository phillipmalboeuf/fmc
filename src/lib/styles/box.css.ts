import { texts } from '$lib/formatters'
import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const box = recipe({
  base: [fmc({ background: 'white', color: 'black' }), {
    borderRadius: 12,
    position: 'relative',
    marginBottom: '1rem',
    // border: '1px solid transparent',
    overflow: 'hidden'
  }],

  variants: {
    color: {
      white: fmc({ background: 'white' }),
      muted: fmc({ background: 'offwhite' }),
      outline: { border: '1px solid var(--color)', background: 'transparent' },
      green: { background: vars.colors['green'], color: vars.colors[texts('green')] },
      blue: { background: vars.colors['blue'], color: vars.colors[texts('blue')] },
      cyan: { background: vars.colors['cyan'], color: vars.colors[texts('cyan')] },
      pink: { background: vars.colors['pink'], color: vars.colors[texts('pink')] },
      violet: fmc({ background: 'violet', color: 'black' }),
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