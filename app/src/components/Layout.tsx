import type { ReactNode } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <div className="bg-dark-blue-60 backdrop-blur-[6px] sm:px-8 px-4 flex justify-center items-center fixed w-full z-10">
                <div className="w-full">
                    <Navbar />
                </div>
            </div>
            <div className="flex justify-center items-start flex-col">{children}</div>
            <Footer />
        </>
    );
}
