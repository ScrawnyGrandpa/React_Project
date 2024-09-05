import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import EditUserSchema from "../../schema/EditUserSchema";
import { Box, Grid } from "@mui/material";

export default function UserProfilePage() {
    const { user } = useAuthentication();
    const [defaultValue, setDefaultValue] = useState();
    const { setNotification } = usePageUI();
    const schema = useMemo(() => new EditUserSchema(), []);
    const navigate = useNavigate();

    const onCancel = useCallback(() => navigate(ROUTES.ROOT), []);

    const onSubmit = useLoadCallback(async data => {
        setDefaultValue(data);
        await user.fromObject(data).save();
        setNotification({ message: "Profile updated", severity: "success" });
    }, [user]);

    useEffect(() => {
        setDefaultValue(user?.toObject());
    }, [user]);

    return (
        <PageContent>
            {defaultValue &&
                <Grid container spacing={4} alignItems="stretch">
                    <Grid item xs={12} md={8}>
                        <Box sx={{ padding: 3, borderRadius: 2, }}>
                            <SchemaForm title="Edit User Profile" {...{ defaultValue, schema, onCancel, onSubmit }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img
                            src={user?.image.url}
                            alt="BurbWuff"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: 8
                            }}
                        />
                    </Grid>
                </Grid>
            }
            {!user && <Navigate to={ROUTES.ROOT} replace />}
        </PageContent>
    );
}