"use client";

import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from './ResumeDocument';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ResumeDownloadButton = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <motion.button
                className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white/20 text-white/90 font-bold rounded-lg transition-all hover:border-white/40 magnetic-btn w-full sm:w-auto text-center flex items-center gap-2 justify-center"
            >
                <span>📄</span> Resume
            </motion.button>
        );
    }

    return (
        <PDFDownloadLink document={<ResumeDocument />} fileName="Sabiha_Malik_Resume.pdf">
            {/* @ts-ignore */}
            {({ blob, url, loading, error }) => (
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white/20 text-white/90 font-bold rounded-lg transition-all hover:border-white/40 magnetic-btn w-full sm:w-auto text-center flex items-center gap-2 justify-center"
                >
                    <span>📄</span> {loading ? 'Preparing...' : 'Resume'}
                </motion.button>
            )}
        </PDFDownloadLink>
    );
};

export default ResumeDownloadButton;
