const checkValidty = (value, validation, anotherValue = null) => {
    let isValid = true;

    if (validation.isUserName) {
        const userReg = /^[a-z0-9_\s]{5,20}$/gi;
        const startReg = /^\s|\s$/;
        const result = userReg.test(value) && !startReg.test(value);
        isValid = isValid && result;
    }

    if (validation.isEmail) {
        const emailReg = /^[\w\.]{5,}@[a-zA-Z]+\.[a-z]{2,5}$/;
        const result = emailReg.test(value);
        isValid = isValid && result;
    }

    if (validation.isPass) {
        const passReg = /[\w]{8,}/;
        const hasNumReg = /[0-9]+/;
        const hasCapital = /[A-Z]+/;
        const result =
            passReg.test(value) &&
            hasNumReg.test(value) &&
            hasCapital.test(value);
        isValid = isValid && result;
    }

    if (validation.isSame) {
        isValid = isValid && anotherValue.valid && anotherValue.value === value;
    }

    if (validation.isChainName) {
        const chainNameReg = /^\w[\w\s]{1,25}\w$/;
        isValid = isValid && chainNameReg.test(value);
    }

    return isValid;
};

export default checkValidty;
