/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core System Colors
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // slate-800
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-600
        
        // Card & Surface Colors
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        surface: 'var(--color-surface)', // slate-50
        
        // Muted Colors
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        
        // Brand Primary Colors
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600
          foreground: 'var(--color-primary-foreground)' // white
        },
        
        // Brand Secondary Colors
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-500
          foreground: 'var(--color-secondary-foreground)' // white
        },
        
        // Accent Colors
        accent: {
          DEFAULT: 'var(--color-accent)', // slate-50
          foreground: 'var(--color-accent-foreground)' // slate-800
        },
        
        // State Colors
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        // Text Hierarchy
        'text-primary': 'var(--color-text-primary)', // slate-800
        'text-secondary': 'var(--color-text-secondary)', // slate-500
        
        // Trust Builder
        trust: {
          DEFAULT: 'var(--color-trust)', // slate-900
          foreground: 'var(--color-trust-foreground)' // white
        },
        
        // Conversion CTA
        cta: {
          DEFAULT: 'var(--color-cta)', // blue-600
          foreground: 'var(--color-cta-foreground)' // white
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Inter', 'sans-serif']
      },
      fontSize: {
        'brand-xs': ['0.75rem', { lineHeight: '1.6' }], // 12px
        'brand-sm': ['0.875rem', { lineHeight: '1.6' }], // 14px
        'brand-base': ['1rem', { lineHeight: '1.6' }], // 16px
        'brand-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'brand-xl': ['1.25rem', { lineHeight: '1.2' }], // 20px
        'brand-2xl': ['1.5rem', { lineHeight: '1.2' }], // 24px
        'brand-3xl': ['1.875rem', { lineHeight: '1.2' }], // 30px
        'brand-4xl': ['2.25rem', { lineHeight: '1.2' }], // 36px
        'brand-5xl': ['3rem', { lineHeight: '1.2' }], // 48px
        'brand-6xl': ['3.75rem', { lineHeight: '1.2' }] // 60px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
        '144': '36rem' // 576px
      },
      borderRadius: {
        'brand': '8px',
        'brand-lg': '12px',
        'brand-xl': '16px'
      },
      boxShadow: {
        'brand': 'var(--shadow-brand-primary)',
        'brand-secondary': 'var(--shadow-brand-secondary)',
        'floating': 'var(--shadow-floating)',
        'conversion': 'var(--shadow-conversion)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'progress': 'progress 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'ease-out'
      },
      transitionDuration: {
        'brand-fast': '200ms',
        'brand-normal': '300ms',
        'brand-slow': '600ms'
      },
      backdropBlur: {
        'brand': '20px'
      },
      gridTemplateColumns: {
        'golden': '1.618fr 1fr',
        'hero': '60% 40%',
        'feature': 'repeat(auto-fit, minmax(300px, 1fr))'
      },
      aspectRatio: {
        'golden': '1.618',
        'video': '16 / 9',
        'square': '1 / 1'
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}