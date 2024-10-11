import { ColorTheme } from '../assets/ColorTheme'
import { useThemeMode } from 'flowbite-react'

export function colorsFunction() {
    const { mode } = useThemeMode()

    const colors = ColorTheme[mode]

    return colors
}

