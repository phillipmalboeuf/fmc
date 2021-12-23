import { createGlobalTheme, globalStyle, globalFontFace } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'


const space = {
  zero: '0',
  small: '2vw',
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
  coral: '#7CAAEF',
  blue: '#0000FF',
  cyan: '#2BFFF5',
  marin: '#01044c',
  violet: '#B3B2FE',
  green: '#81FF5D',
  yellow: '#9BEFBE'
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
  fontSize: `${base}px`,
  scrollBehavior: 'smooth'
})

globalStyle('body', {
  margin: 0,
  color: vars.colors.white,
  background: vars.colors.blackish,
})

globalStyle('main', {
  padding: vars.space.medium,
  minHeight: '100vh'
})

globalStyle('h1, h2, h3', {
  fontFamily: vars.fonts.heading,
  fontSize: `${100/base}rem`,
  textTransform: 'uppercase',
  lineHeight: 1
})

globalStyle('h2, .h2, h3', {
  fontSize: `${60/base}rem`,
})

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: '0 0 ' + vars.space.small
})

globalStyle('h4', {
  fontSize: `${40/base}rem`,
  fontWeight: 'normal'
})

globalStyle('h5', {
  fontSize: `${30/base}rem`,
  textTransform: 'uppercase',
  fontWeight: 'normal'
})

globalStyle('h6', {
  fontFamily: vars.fonts.heading,
  fontSize: `1rem`
})

globalStyle('p', {
  fontSize: `1rem`,
  fontWeight: 'normal'
})

globalStyle('a', {
  color: 'currentColor'
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
        fontSize: `${100/base}rem`
      },
      big: {
        fontSize: `${60/base}rem`
      },
      medium: {
        fontSize: `${40/base}rem`
      }
    }
  }
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {
      '@media': '(prefers-color-scheme: light)'
    },
    darkMode: { '@media': '(prefers-color-scheme: dark)' }
  },
  defaultCondition: 'darkMode',
  properties: {
    color: colors,
    background: colors
  }
});

export const fmc = createSprinkles(
  responsiveProperties,
  colorProperties
);