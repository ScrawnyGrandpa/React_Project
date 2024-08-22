import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function Main({ children }) {
    const { theme } = useTheme();

    return (
        <Box sx={{ minHeight: "85vh", backgroundColor: theme.palette.background.default }}>{children}</Box>
    );
};