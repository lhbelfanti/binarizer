import { AuthFormCredentials } from "~/components/AuthForm/types";

const isValidUsername = (value: string) => {
    return value && value.trim().length >= 5;
}

const isValidPassword = (value: string) => {
    return value && value.trim().length >= 7;
}

export const validateCredentials = (input: AuthFormCredentials) => {
    const validationErrors: { [key: string]: unknown } = {};

    if (!isValidUsername(input.username)) {
        validationErrors.username = 'Invalid username. Must be at least 5 characters long.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }
}