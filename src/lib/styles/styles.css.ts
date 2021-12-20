import { createTheme, globalStyle } from '@vanilla-extract/css'
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
  grey: '#F6F7F6',
  pink: '#FF0063',
  blue: '#0000FF'
}

const fonts = {
  body: 'Trim, sans-serif',
  heading: 'Trim Poster Lean, sans-serif'
}

export const [themeClass, vars] = createTheme({
  colors,
  fonts,
  space
})

globalStyle('*', {
	boxSizing: 'border-box'
})


globalStyle('html', {
  fontFamily: fonts.body,
  scrollBehavior: 'smooth'
})

globalStyle('body', {
  margin: 0
})

globalStyle('main', {
  padding: vars.space.medium,
  color: colors.white,
  background: colors.blackish,
  minHeight: '100vh'
})

globalStyle('h1, h2, h3', {
  fontFamily: fonts.heading,
  lineHeight: 1
})

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: '0 0 ' + vars.space.small
})

globalStyle('a', {
  color: 'currentColor'
})

globalStyle('[id]', {
  scrollMarginTop: space.medium
})


const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' }
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex'],
    flexDirection: ['row', 'column'],
    padding: space
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