import { useState } from "react";

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const useForm = ({ defaultValues = {}, validationSchema = {} } = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach((field) => {
      const rules = validationSchema[field];
      const value = values[field];
      const fieldLabel = formatFieldName(field);
      
      if (rules.required === true && !value) {
        newErrors[field] = `${fieldLabel} is required`;
        return;
      }
      
      if (rules.email && value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        newErrors[field] = `Invalid ${fieldLabel.toLowerCase()} format`;
        return;
      }
      
      if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.patternMessage || `Invalid ${fieldLabel.toLowerCase()} format`;
        return;
      }
      
      if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = rules.minLengthMessage || `${fieldLabel} must be at least ${rules.minLength} characters`;
        return;
      }

      if (rules.maxLength && value && value.length > rules.maxLength) {
        newErrors[field] = rules.maxLengthMessage || `${fieldLabel} must be no more than ${rules.maxLength} characters`;
        return;
      }

      if (rules.validate && typeof rules.validate === 'function') {
        const error = rules.validate(value);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name] && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault();
    
    const isValid = validate();
    if (isValid) {
      onSubmit(values);
    }
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
  };

  const getFieldProps = (name) => ({
    value: values[name] || "",
    onChange: handleChange(name),
    onBlur: handleBlur(name),
    error: Boolean(touched[name] && errors[name]),
    helperText: touched[name] ? errors[name] : "",
  });

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    reset,
    getFieldProps,
    setValues,
    setErrors,
  };
};
