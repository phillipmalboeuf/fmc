import { recipe } from '@vanilla-extract/recipes'
import { fmc, vars } from './styles.css'

export const grid = recipe({
  base: {
    display: 'grid',
    // '@media': {
    //   'screen and (max-width: 888px)': {
    //     gridTemplateColumns: '1fr'
    //   }
    // }
  },

  variants: {
    columns: {
      1: { gridTemplateColumns: '1fr' },
      2: { gridTemplateColumns: '1fr 1fr' },
      3: { gridTemplateColumns: '1fr 1fr 1fr' },
      4: { gridTemplateColumns: '1fr 1fr 1fr 1fr' },
      'auto': { gridTemplateColumns: '1fr' },
    },
    gap: {
      tight: fmc({ columnGap: 'small' }),
      small: fmc({ columnGap: 'small', rowGap: 'small' }),
      medium: fmc({ columnGap: 'medium', rowGap: 'medium' }),
    },
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
      2: { gridColumn: 'span 2' },
      3: { gridColumn: 'span 3' },
      4: { gridColumn: 'span 4' }
    },
    start: {
      2: { gridColumnStart: '2' },
      3: { gridColumnStart: '3' },
      4: { gridColumnStart: '4' }
    },
    top: {
      true: { alignSelf: 'flex-start' }
    }
  },

  defaultVariants: {
  }
})