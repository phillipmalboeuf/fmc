import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const grid = recipe({
  base: {
    display: 'grid',
    '@media': {
      'screen and (max-width: 888px)': {
        gridTemplateColumns: '1fr'
      },
      'print': {
        gridTemplateColumns: '1fr'
      }
    }
  },

  variants: {
    columns: {
      1: { gridTemplateColumns: '1fr' },
      2: { gridTemplateColumns: '1fr 1fr' },
      3: { gridTemplateColumns: '1fr 1fr 1fr' },
      4: { gridTemplateColumns: '1fr 1fr 1fr 1fr' },
      5: { gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' },
    },
    gap: {
      tight: { columnGap: '1em', rowGap: '1em' },
      horizontal: fmc({ columnGap: 'small' }),
      small: fmc({ columnGap: 'small', rowGap: 'small' }),
      medium: fmc({ columnGap: 'medium', rowGap: 'medium' }),
    },
    align: {
      top: { alignItems: 'flex-start' },
      middle: { alignItems: 'center' },
      bottom: { alignItems: 'flex-end' }
    }
  },

  defaultVariants: {
    columns: 4,
    gap: 'small'
  }
})

export const col = recipe({
  base: {
  },

  variants: {
    span: {
      2: { gridColumn: 'span 2', '@media': {
        'screen and (max-width: 888px)': { gridColumn: 'span 1' },
        'print': { gridColumn: 'span 1' }
      } },
      3: { gridColumn: 'span 3', '@media': {
        'screen and (max-width: 888px)': { gridColumn: 'span 2' },
        'print': { gridColumn: 'span 2' }
      } },
      4: { gridColumn: 'span 4' }
    },
    start: {
      1: { gridColumnStart: '1' },
      2: { gridColumnStart: '2', '@media': {
        'screen and (max-width: 888px)': { gridColumnStart: '1' },
        'print': { gridColumnStart: '1' }
      } },
      3: { gridColumnStart: '3' },
      4: { gridColumnStart: '4' }
    },
    align: {
      top: { alignSelf: 'flex-start' },
      middle: { alignSelf: 'center' },
      bottom: { alignSelf: 'flex-end' }
    }
  },

  defaultVariants: {
  }
})