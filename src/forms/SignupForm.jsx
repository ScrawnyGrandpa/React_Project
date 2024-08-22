import React from "react";
import Form from "./Form";
import Input from "./Input";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useTheme } from "../providers/CustomThemeProvider";

export default function SignupForm({
    onSubmit,
    onReset,
    validateForm,
    title,
    errors,
    data,
    onInputChange,
    handleChangeCheckBox,
}) {

    const { theme } = useTheme();
    return (
        <Form
            onSubmit={onSubmit}
            onReset={onReset}
            validateForm={validateForm}
            title={title}
            styles={{ maxWidth: "800px" }}
        >
            <Input
                name="first"
                label="First Name"
                error={errors.first}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="middle"
                label="Middle Name"
                error={errors.middle}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="last"
                label="Last Name"
                error={errors.last}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="phone"
                label="Phone Number"
                type="phone"
                error={errors.phone}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="password"
                label="Password"
                type="password"
                error={errors.password}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="url"
                label="Image URL"
                error={errors.url}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="alt"
                label="Image ALT"
                error={errors.alt}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="state"
                label="State"
                error={errors.state}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                label="country"
                name="Country"
                error={errors.country}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="city"
                label="City"
                error={errors.city}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="street"
                label="Street"
                error={errors.street}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="houseNumber"
                label="House Number"
                type="number"
                error={errors.houseNumber}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="zip"
                label="Zip Code"
                error={errors.zip}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Grid item>
                <FormControlLabel sx={{ color: theme.palette.text.primary }}
                    onChange={handleChangeCheckBox}
                    name="isBusiness"
                    control={<Checkbox value={data.isBusiness} />}
                    label="Signup as business"
                />
            </Grid>
        </Form>
    );
}