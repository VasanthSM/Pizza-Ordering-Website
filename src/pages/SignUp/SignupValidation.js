const validation = (values) =>{
    let error = {}
    const email_pattern = /^[^\s@] + @[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.name === ""){
        error.name = "name field is empty!"
    }else{
        error.name = ""
    }

    if(values.email === ""){
        error.email = "Email field is empty!"
    } else if (!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }else{
        error.email = ""
    }

    if (values.password === ""){
        error.password = "Password Should not match"
    }else if (!password_pattern.test(values.password)){
        error.password = "password didn't match"
    }else{
        error.password=""
    }
    return error;
}
export default validation;