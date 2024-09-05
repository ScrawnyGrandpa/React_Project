import UserModel from "../../models/UserModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { Box } from "@mui/material";
import SchemaForm from "../../components/forms/SchemaForm";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useSearch } from "../../providers/SearchProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function LoginPage() {
  const [defaultValue, setDefaultValue] = useState(new UserModel().toObject());
  const schema = useMemo(() => new LoginSchema(), []);
  const { user, login } = useAuthentication();
  const { setShowSearch } = useSearch();
  const { setNotification } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.ROOT), []);

  const onSubmit = useLoadCallback(async ({ email, password }) => {
    setDefaultValue({ email, password });
    await login(email, password);
    setNotification({ message: "Logged In", severity: "success" });
  }, []);

  useEffect(() => {
    setShowSearch(false);
  }, []);

  return (
    <PageContent>
      {user && <Navigate to={ROUTES.ROOT} replace />}
      {
        !user &&
        <Box maxWidth="sm" m="auto" py={2}>
          <SchemaForm title="login" {...{ defaultValue, schema, onCancel, onSubmit }} />
        </Box>
      }
    </PageContent>
  );
}