const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.js'],
  variants: {
    opacity: ['responsive', 'hover', 'group-hover', 'focus'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    spacing: {
      ...defaultTheme.spacing,
      7: '1.75rem',
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      default: '0.375rem',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        fc: '#FCFCFC',
        f7: '#F7F7F7',
        f5: '#F5F5F5',
        f2: '#F2F2F2',
        d6: '#D6D6D6',
        dc: '#DCDCDC',
        c5: '#C5C5C5',
        bb: '#BBBEBF',
        bc: '#BCBCBC',
        b0: '#B0B0B0',
        ae: '#AEAEAE',
        a4: '#A4ABB0',
        97: '#979797',
        '8b': '#8B8B8B',
        87: '#878787',
        71: '#717171',
        '6b': '#6B6B6B',
        '6e': '#6E6E6E',
        '5f': '#5F6266',
        '4f': '#4F4F4F',
        49: '#494949',
        45: '#454545',
        35: '#353535',
        '02': '#020202',
      },
      blue: {
        facebook: '#4F6CAC',
        primary: '#06ACEE',
        deep: '#0091FF',
      },
      red: {
        ...defaultTheme.colors.red,
        primary: '#FF5A5A',
      },
      mustard: {
        primary: '#F2C200',
        dark: '#DDB100',
        darkest: '#EEAF00',
      },
    },
  },
}
