import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function NavBarLink({ to, sx, children }) {
    const { theme } = useTheme();
    return (
        <Link to={to} style={{ textDecoration: "none", color: theme.palette.text.primary, ...sx }}>
            {children}
        </Link>
    );
};