import * as React from "react";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useCurrentUser } from "../providers/UserProvider";

export default function CardActionBar({ cardId, onDelete, onEdit, onLike }) {

    const { user } = useCurrentUser();

    return (
        <>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                    {user && <IconButton onClick={() => onDelete(cardId)}>
                        <DeleteIcon />
                    </IconButton>}
                    {user && <IconButton onClick={() => onEdit(cardId)}>
                        <ModeEditIcon />
                    </IconButton>}
                </Box>
                <Box>
                    <IconButton>
                        <CallIcon />
                    </IconButton>
                    {user && <IconButton onClick={() => onLike(cardId)}><FavoriteIcon /></IconButton>}
                </Box>
            </CardActions>
        </>
    )
}
