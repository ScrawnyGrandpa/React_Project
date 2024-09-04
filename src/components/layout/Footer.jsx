import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { Favorite, Info, Portrait, Style } from "@mui/icons-material";
import { useAuthentication } from "../../providers/AuthenticationProvider";

export default function Footer() {
    const navigate = useNavigate();
    const { user } = useAuthentication();

    return (
        <Paper elevation={3} component="footer">
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    label="About"
                    icon={<Info />}
                    onClick={() => navigate(ROUTES.ABOUT)}
                />
                <BottomNavigationAction
                    label="Cards"
                    icon={<Style />}
                    onClick={() => navigate(ROUTES.CARDS)}
                />
                {user && <BottomNavigationAction
                    label="Fav Cards"
                    icon={<Favorite />}
                    onClick={() => navigate(ROUTES.FAV_CARDS)}
                />}
                {(user && user.isBusiness) && <BottomNavigationAction
                    label="My Cards"
                    icon={<Portrait />}
                    onClick={() => navigate(ROUTES.MY_CARDS)}
                />}
            </BottomNavigation>
        </Paper>
    );
}