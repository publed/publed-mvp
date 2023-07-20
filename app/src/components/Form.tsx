import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface FormProps {
    formTitle: string;
    submitButtonText: string;
    onSubmit: (formData: any) => void;
    formFields: { label: string; name: string }[];
}

const FormComponent: React.FC<FormProps> = ({ formTitle, submitButtonText, onSubmit, formFields }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
        resetFormData();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const resetFormData = () => {
        setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                backgroundColor: 'white',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h2>{formTitle}</h2>
            {formFields.map((field) => (
                <TextField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    variant="standard"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                />
            ))}
            <Button type="submit">{submitButtonText}</Button>
        </Box>
    );
};

export default FormComponent;
