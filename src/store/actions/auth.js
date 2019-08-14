import * as actionTypes from "./actionTypes";
import axios from "axios";

let API_KEY;

export const fetchTimeZones = timeZones => {
    return {
        type: actionTypes.FETCH_TIME_ZONES,
        timeZones: timeZones
    };
};

export const fetchZones = () => {
    return dispatch => {
        axios
            .get("http://worldtimeapi.org/api/timezone")
            .then(res => dispatch(fetchTimeZones(res.data)))
            .catch(error => console.log(error));
    };
};

//sign up
export const signUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START
    };
};

export const signUpSucceed = userData => {
    localStorage.setItem("localId", userData.userId);
    localStorage.setItem("idToken", userData.idToken);
    localStorage.setItem(
        "expiresIn",
        new Date(new Date().getTime() + userData.expiresIn * 1000)
    );
    localStorage.setItem("username", userData.username);
    localStorage.setItem("localZone", userData.localZone);

    return {
        type: actionTypes.SIGN_UP_SUCCEED,
        userData: userData
    };
};

export const signUpFailed = () => {
    return {
        type: actionTypes.SIGN_UP_FAILED
    };
};

export const registerOnDatabase = userData => {
    return dispatch => {
        axios
            .post(
                "https://activity-checker.firebaseio.com/users.json",
                userData
            )
            .catch(error => console.log(error));
    };
};

export const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");
    localStorage.removeItem("expiresIn");
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthTime = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

export const signUpUser = data => {
    return dispatch => {
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                {
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }
            )
            .then(res => {
                dispatch(
                    registerOnDatabase({
                        userId: res.data.localId,
                        username: data.username,
                        localZone: data.localZone
                    })
                );
                dispatch(
                    signUpSucceed({
                        userId: res.data.localId,
                        idToken: res.data.idToken,
                        expiresIn: res.data.expiresIn,
                        username: data.username,
                        localZone: data.localZone
                    })
                );

                dispatch(checkAuthTime(res.data.expiresIn));
            })

            .catch(error => console.log(error));
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const idToken = localStorage.getItem("idToken");
        if (!idToken) {
            dispatch(logout());
        } else {
            const expiresIn = new Date(localStorage.getItem("expiresIn"));
            if (new Date() < expiresIn) {
                console.log("reached here");
                dispatch(
                    checkAuthTime(
                        (expiresIn.getTime() - new Date().getTime()) / 1000
                    )
                );
                dispatch(
                    signUpSucceed({
                        userId: localStorage.getItem("localId"),
                        idToken: localStorage.getItem("idToken"),
                        expiresIn: localStorage.getItem("expiresIn"),
                        username: localStorage.getItem("username"),
                        localZone: localStorage.getItem("localZone")
                    })
                );
            } else {
                console.log("reached here");
                dispatch(logout());
            }
        }
    };
};

//sign in
export const singInStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    };
};

export const signInSucceed = userData => {
    return {
        type: actionTypes.SIGN_IN_SUCCEED,
        idToken: userData.idToken,
        userId: userData.localId,
        expiresIn: userData.expiresIn
    };
};

export const fetchUserData = userId => {
    return dispatch => {
        axios
            .get("https://activity-checker.firebaseio.com/users.json")
            .then(res => {
                console.log(res.data);
                let user = null;
                for (let key in res.data) {
                    if (res.data[key].userId === userId) {
                        user = res.data[key];
                    }
                }
                console.log(user);
            });
    };
};

export const signIn = signInData => {
    return dispatch => {
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    email: signInData.email,
                    password: signInData.password,
                    returnSecureToken: true
                }
            )
            .then(res => {
                console.log(res);
                dispatch(
                    signInSucceed({
                        idToken: res.data.idToken,
                        localId: res.data.localId,
                        expiresIn: res.data.expiresIn
                    })
                );
                dispatch(fetchUserData(res.data.localId));
            });
    };
};
