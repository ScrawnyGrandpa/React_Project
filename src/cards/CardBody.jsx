import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CardBody({ phone, bizNumber, address }) {
    return (
        <>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <strong>Phone: </strong>
                    {phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Address: </strong>
                    {address.city} {address.street} {address.houseNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Card Number: </strong>
                    {bizNumber}
                </Typography>
            </CardContent>
        </>
    )
}
