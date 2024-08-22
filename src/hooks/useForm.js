import Joi from "joi";
import { useCallback, useState } from "react";
import useAxios from "./useAxios";


export default function useForm(initialForm, schema, handleSubmit) {
    const [data, setData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useAxios();

    const validateProperty = useCallback((name, value) => {
        let joiSchema = Joi.object({ [name]: schema[name] });
        let { error } = joiSchema.validate({ [name]: value });
        return error ? error.details[0].message : null;
    }, [schema]);

    const handleChangeCheckBox = useCallback((event) => {
        let value = event.target.checked;
        let name = event.target.name;
        setData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleChange = useCallback((event) => {
        let value = event.target.value;
        let name = event.target.name;
        const errorMessage = validateProperty(name, value);
        if (errorMessage) {
            setErrors(prev => ({ ...prev, [name]: errorMessage }))
        } else {
            setErrors((prev => {
                let obj = { ...prev };
                delete obj[name];
                return obj;
            }));
        }
        setData((prev) => ({ ...prev, [name]: value }));
    }, [validateProperty]);

    const validateForm = useCallback(() => {
        const joiSchema = Joi.object(schema);
        const { error } = joiSchema.validate(data);
        if (error) return false;
        return true;
    }, [schema, data]);

    const handleReset = useCallback(() => {
        setData(initialForm);
        setErrors({});
    }, [initialForm]);

    const onSubmit = useCallback(() => {
        handleSubmit(data);
    }, [data]);

    return {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeCheckBox,
    }
}