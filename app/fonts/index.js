import localFont from 'next/font/local'

export const inter = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-inter'
})

export const dmSans = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/DM_Sans/DMSans-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-dm-sans'
})

export const montserrat = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Montserrat/Montserrat-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Montserrat/Montserrat-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-montserrat'
})

export const manrope = localFont({
  src: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Manrope/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope'
})

export const playfairDisplay = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-playfair'
})

export const plusJakartaSans = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Plus_Jakarta_Sans/PlusJakartaSans-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-plus-jakarta'
})

export const robotoMono = localFont({
  src: [
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Roboto_Mono/RobotoMono-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../font/Cinzel,DM_Sans,Inter,Manrope,Montserrat,etc (3)/Roboto_Mono/RobotoMono-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-roboto-mono'
})