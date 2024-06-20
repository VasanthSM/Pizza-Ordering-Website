const validation = (values) => {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.name.trim() === "") {
        errors.name = "Name field is empty!";
    }

    if (values.email.trim() === "") {
        errors.email = "Email field is empty!";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email didn't match";
    }

    if (values.password.trim() === "") {
        errors.password = "Password should not be empty";
    }
    return errors;
};

export default validation;
