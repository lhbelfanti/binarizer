import {AuthFormCredentials, AuthFormErrors} from "~/components/AuthForm/types";

const isValidUsername = (value: string) => {
    return value && value.trim().length >= 5;
}

const isValidPassword = (value: string) => {
    return value && value.trim().length >= 7;
}

export const validateCredentials = (input: AuthFormCredentials) => {
    const authFormErrors: AuthFormErrors = {};

    if (!isValidUsername(input.username)) {
        authFormErrors.username = 'Invalid username. Must be at least 5 characters long.'
    }

    if (!isValidPassword(input.password)) {
        authFormErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (Object.keys(authFormErrors).length > 0) {
        throw authFormErrors;
    }
}