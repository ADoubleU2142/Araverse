import type { ColorMode } from '../types/artwork'

const colorModeLabels: Record<ColorMode, string> = {
  color: 'Color',
  'black-and-white': 'Black & White',
  'black-and-white-accent': 'Black & White + Accent',
}

export function isColorMode(value: string | null): value is ColorMode {
  return value !== null && value in colorModeLabels
}

export function getColorModeLabel(colorMode: ColorMode) {
  return colorModeLabels[colorMode]
}
