import { createGlobalTheme, globalStyle, globalFontFace, globalKeyframes } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'


const space = {
  zero: '0',
  small: 'max(2vw, 2vh)',
  medium: '4vw',
  large: '8vw'
};

const colors = {
  black: '#000',
  blackish: '#0E0E0E',
  white: '#fff',
  grey: '#95999A',
  offwhite: '#F6F7F6',
  pink: '#FF0063',
  coral: '#FEAAC7',
  blue: '#0000FF',
  cyan: '#2BFFF5',
  marin: '#01044c',
  moss: '#044554',
  violet: '#B3B2FE',
  green: '#D5FF18',
  yellow: '#EBFEB9'
}

const fonts = {
  body: 'Trim, sans-serif',
  heading: 'Trim Poster, sans-serif'
}

const base = 18

export const vars = createGlobalTheme(':root', {
  colors,
  fonts,
  space
})

globalFontFace('Trim', {
  src: 'url("/fonts/Trim-Regular.otf") format("opentype")',
  fontWeight: 'normal',
  fontDisplay: 'swap'
})

globalFontFace('Trim', {
  src: 'url("/fonts/Trim-Bold.otf") format("opentype")',
  fontWeight: 'bold',
  fontDisplay: 'swap'
})

globalFontFace('Trim Poster', {
  src: 'url("/fonts/TrimPoster-Lean.otf") format("opentype")',
  fontWeight: 'bold',
  fontDisplay: 'swap'
})

globalStyle('*', {
	boxSizing: 'border-box'
})

globalStyle('html', {
  fontFamily: vars.fonts.body,
  fontSize: `${base/1.333}px`,
  lineHeight: 1.2,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  scrollBehavior: 'smooth',
  '@media': {
    'screen and (max-width: 888px)': {
      fontSize: `${base/1.5}px`,
    },
    'screen and (min-width: 1888px)': {
      fontSize: `${base}px`,
    }
  }
})

globalStyle('body', {
  margin: 0,
  color: vars.colors.white,
  background: vars.colors.blackish,
})

globalStyle('main', {
  padding: vars.space.small,
  minHeight: '100vh'
})

globalStyle('h1, h2, h3', {
  fontFamily: vars.fonts.heading,
  fontSize: `${88/base}rem`,
  textTransform: 'uppercase',
  lineHeight: 1,
  '@media': {
    'screen and (max-width: 888px)': {
      fontSize: `${60/base}rem`,
    }
  }
})

globalStyle('h2, .h2, h3, .h3', {
  fontSize: `${60/base}rem`,
  '@media': {
    'screen and (max-width: 888px)': {
      fontSize: `${50/base}rem`,
    }
  }
})

globalStyle('h3, .h3', {
  textTransform: 'none',
})

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: '0 0 ' + vars.space.small,
  whiteSpace: 'pre-line'
})

globalStyle('h4', {
  fontSize: `${40/base}rem`,
  fontWeight: 'normal',
  '@media': {
    'screen and (max-width: 888px)': {
      fontSize: `${25/base}rem`,
    }
  }
})

globalStyle('h5', {
  fontSize: `${30/base}rem`,
  textTransform: 'uppercase',
  fontWeight: 'normal',
  '@media': {
    'screen and (max-width: 888px)': {
      fontSize: `${25/base}rem`,
    }
  }
})

globalStyle('h6', {
  fontFamily: vars.fonts.heading,
  fontSize: `1.88rem`
})

globalStyle('p', {
  fontSize: `${22/base}rem`,
  fontWeight: 'normal',
})

globalStyle('a', {
  color: 'currentColor'
})

globalStyle('small, small > p', {
  fontSize: '0.95em',
  lineHeight: 1.33
})

globalStyle('button', {
  fontFamily: vars.fonts.body,
  cursor: 'pointer',
  color: 'currentColor'
})

globalStyle('figure', {
  margin: 0
})

globalStyle('[id]', {
  scrollMarginTop: vars.space.medium
})


const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' }
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex', 'grid'],
    flexDirection: ['row', 'column'],
    padding: space,
    columnGap: space,
    rowGap: space,
    position: ['sticky', 'relative', 'absolute'],
    fontSize: {
      huge: {
        fontSize: `${100/base}rem`,
        '@media': {
          'screen and (max-width: 888px)': {
            fontSize: `${60/base}rem`,
          }
        }
      },
      big: {
        fontSize: `${60/base}rem`,
        '@media': {
          'screen and (max-width: 888px)': {
            fontSize: `${40/base}rem`,
          }
        }
      },
      medium: {
        fontSize: `${40/base}rem`,
        '@media': {
          'screen and (max-width: 888px)': {
            fontSize: `${30/base}rem`,
          }
        }
      }
    }
  }
})

const colorProperties = defineProperties({
  // conditions: {
  //   lightMode: {
  //     '@media': '(prefers-color-scheme: light)'
  //   },
  //   darkMode: { '@media': '(prefers-color-scheme: dark)' }
  // },
  // defaultCondition: 'darkMode',
  properties: {
    color: colors,
    background: colors
  }
})

export const fmc = createSprinkles(
  responsiveProperties,
  colorProperties
)

globalStyle('.observed.slideIn', {
  animation: "slide-in 0.666s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"
})

globalKeyframes('slide-in', {
  '0%': {
    transform: 'translateY(33px)',
    opacity: '0',
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: '1',
  }
})