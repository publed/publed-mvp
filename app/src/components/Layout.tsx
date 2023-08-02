import type { ReactNode } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Header from './Header';
// import DefaultHeader from './DefaultHeader'
// import DefaultFooter from './DefaultFooter'

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            {children}
            <footer>Footer</footer>
        </>
    );
}
