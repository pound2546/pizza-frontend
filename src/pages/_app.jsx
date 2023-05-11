import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ToastContainer, toast } from 'react-toastify';
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications position="bottom-left" />
            <Head>
                <title>Pizza</title>
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
        </MantineProvider>
    );
}
