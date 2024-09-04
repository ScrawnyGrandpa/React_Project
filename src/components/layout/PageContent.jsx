import { Box, CircularProgress, Typography } from "@mui/material";
import { usePageUI } from "../../providers/PageUIProvider";
import { useEffect, useState } from "react";

export default function PageContent({ children }) {
    const [initialLoading, setInitialLoading] = useState(true);
    const { isLoading, error } = usePageUI();

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    return (
        initialLoading || isLoading ?
            <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress size={72} />
                </Box>
            </div> :
            error ?
                <Typography>{error}</Typography> :
                children
    );
}