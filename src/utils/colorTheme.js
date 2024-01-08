export const colorTheme = (path) => {
    switch (path) {
        case '/':
            return 'bg-white';
        case '/kelas':
            return 'bg-[#EDF3F3]';
        default:
            return 'bg-primary-1';
    }
};
