import { Container, Alert, Box, Snackbar } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";
import "../../styles/layout.scss";
import SearchProvider from "../../providers/SearchProvider";
import { useCallback, useEffect, useState } from "react";
import { usePageUI } from "../../providers/PageUIProvider";

export default function Layout({ children }) {
    const { theme } = useTheme();
    const { notification } = usePageUI();
    const [showNotification, setShowNotification] = useState(false);
    const closeNotification = useCallback(() => setShowNotification(false), []);

    useEffect(() => {
        setShowNotification(Boolean(notification));
    }, [notification]);

    return (
        <>
            <SearchProvider>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow="1"
                    color={theme.palette.text.primary}
                    bgcolor={theme.palette.background.default}
                >
                    <Header />
                    <Container component="main" sx={{ flexGrow: 1 }}>
                        {children}
                    </Container>
                    <Footer />
                </Box>
                <Snackbar
                    key={notification?.message}
                    open={showNotification}
                    autoHideDuration={3000}
                    onClose={closeNotification}
                    sx={{ marginBottom: 4 }}
                >
                    <Alert
                        onClose={closeNotification}
                        severity={notification?.severity}
                        variant="filled"
                        sx={{ width: "100%", color: "white" }}
                    >
                        {notification?.message}
                    </Alert>
                </Snackbar>
            </SearchProvider>
        </>
    );
}