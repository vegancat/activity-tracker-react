import * as actionTypes from "./actionTypes";
import axios from "axios";
import { initChains } from "./index";
import { initDates, initDatesSucceed } from "./dates";

let API_KEY = "Ops i'm not gonna share this :(";

//fetching time zone
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

// logout
export const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("username");
    localStorage.removeItem("localZone");
    return {
        type: actionTypes.LOGOUT
    };
};
//logout

export const checkAuthTime = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

export const signUpUser = data => {
    return dispatch => {
        dispatch(signUpStart());
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

            .catch(error => dispatch(signUpFailed()));
    };
};

export const reSignIn = () => {
    return {
        type: actionTypes.RE_SIGN_IN,
        username: localStorage.getItem("username"),
        idToken: localStorage.getItem("idToken"),
        localZone: localStorage.getItem("localZone"),
        localId: localStorage.getItem("localId"),
        firebaseId: localStorage.getItem("firebaseId")
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
                dispatch(
                    checkAuthTime(
                        Math.floor(
                            (expiresIn.getTime() - new Date().getTime()) / 1000
                        )
                    )
                );
                dispatch(reSignIn());
                dispatch(
                    initChains(JSON.parse(localStorage.getItem("chains")))
                );
                dispatch(
                    initDatesSucceed(JSON.parse(localStorage.getItem("dates")))
                );
            } else {
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
    localStorage.setItem("localId", userData.localId);
    localStorage.setItem("idToken", userData.idToken);
    if (userData.expiresIn) {
        localStorage.setItem(
            "expiresIn",
            new Date(new Date().getTime() + userData.expiresIn * 1000)
        );
    }

    localStorage.setItem("username", userData.username);
    localStorage.setItem("localZone", userData.localZone);
    localStorage.setItem("firebaseId", userData.firebaseId);

    return {
        type: actionTypes.SIGN_IN_SUCCEED,
        idToken: userData.idToken,
        localId: userData.localId,
        localZone: userData.localZone,
        username: userData.username,
        firebaseId: userData.firebaseId,
        chains: userData.chains
    };
};

export const signInFailed = () => {
    return {
        type: actionTypes.SIGN_IN_FAILED
    };
};

export const fetchUserData = userData => {
    return dispatch => {
        axios
            .get("https://activity-checker.firebaseio.com/users.json")
            .then(res => {
                let user = null;
                let firebaseId = null;
                for (let key in res.data) {
                    if (res.data[key].userId === userData.localId) {
                        user = res.data[key];
                        firebaseId = key;
                    }
                }

                dispatch(
                    signInSucceed({
                        idToken: userData.idToken,
                        localId: userData.localId,
                        expiresIn: userData.expiresIn,
                        username: user.username,
                        localZone: user.localZone,
                        firebaseId: firebaseId
                    })
                );
                console.log(user.chains);
                dispatch(initChains(user.chains));
                dispatch(initDates(user.localZone));
            });
    };
};

export const signIn = signInData => {
    return dispatch => {
        dispatch(singInStart());
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
                dispatch(fetchUserData(res.data));
            })
            .catch(err => {
                dispatch(signInFailed());
            });
    };
};
