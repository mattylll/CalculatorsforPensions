import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Pension Calculator - Check Your State Pension & Retirement Income (UK)',
    description: 'Use our UK pension calculator to estimate your retirement income. Check your state pension forecast, personalise your pension savings strategy, and ensure your retirement income matches the lifestyle you want.',
    keywords: 'pension calculator, state pension forecast, retirement calculator uk, pension pot calculator, tax relief calculator',
    authors: [{ name: 'Calculators for Pensions' }],
    openGraph: {
        title: 'Pension Calculator - Check Your State Pension & Retirement Income',
        description: 'Free UK pension calculators for state pension, workplace pensions, tax relief, and retirement planning.',
        url: 'https://calculatorsforpensions.com',
        siteName: 'Calculators for Pensions',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pension Calculator - Plan Your UK Retirement',
        description: 'Check your state pension, calculate tax relief, and plan your retirement income with our free calculators.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
                    <Header />
                    <main className="min-h-screen pt-16">
                        {children}
                    </main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
