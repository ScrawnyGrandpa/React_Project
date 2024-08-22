import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routesObject";
import PortraitIcon from '@mui/icons-material/Portrait';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCurrentUser } from "../../providers/UserProvider";

export default function Footer() {
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    return (
        <Paper
            elevation={3}
            sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
        >
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    label="About"
                    icon={<InfoIcon />}
                    onClick={() => navigate(ROUTES.ABOUT)}
                />
                <BottomNavigationAction
                    label="Cards"
                    icon={<StyleIcon />}
                    onClick={() => navigate(ROUTES.CARDS)}
                />
                {user && <BottomNavigationAction
                    label="Fav Cards"
                    icon={<FavoriteIcon />}
                    onClick={() => navigate(ROUTES.FAV_CARDS)}
                />}
                {(user && user.isBusiness) && <BottomNavigationAction
                    label="My Cards"
                    icon={<PortraitIcon />}
                    onClick={() => navigate(ROUTES.MY_CARDS)}
                />}
            </BottomNavigation>
        </Paper>
    );
}