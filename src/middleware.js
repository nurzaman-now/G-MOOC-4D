export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/',
        '/kelas',
        '/kelas/:path*',
        '/rapor',
        '/rapor/:path*',
        // '/reset-password/:path/:path',
        // "/history/:path*",
        // "/notifikasi/:path*",
        // "/akun/:path*",
        // "/order/:path*",
        // '/order/:path/:path',
        // '/order/:path/:path/:path',
    ],
};
