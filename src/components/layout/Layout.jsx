import { Box, Container } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";
import "../../styles/layout.scss";
import SearchProvider from "../../providers/SearchProvider";

export default function Layout({ children }) {
    const { theme } = useTheme();

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
            </SearchProvider>
        </>
    );
}