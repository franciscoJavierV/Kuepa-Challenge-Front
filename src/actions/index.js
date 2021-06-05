import axios from "axios";

export const loginReq = (payload) => ({
    type: "LOGIN_REQ",
    payload,
});

export const sendMessageReq = (payload) => ({
    type: "SET-MESS-REQ",
    payload,
});

export const setError = (payload) => ({
    type: "SET_ERROR",
    payload,
});

export const sendMessage = (payload)=>{
    console.log(payload)
    return(dispatch)=>{
        dispatch(sendMessageReq(payload))
    }
}

export const loginUser = (payload, redirectUrl) => {
    const data = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        id: payload.id,
        role: payload.role,
    }
    return (dispatch) => {
        var config = {
            method: "post",
            url: "http://localhost:3000/api/auth/provider",
            data: data,
        };
        axios(config)
            .then(({
                data
            }) => {
                console.log(data.user)
                document.cookie = `email=${data.user.email}`;
                document.cookie = `name=${data.user.name}`;
                document.cookie = `picture=${data.user.picture.url}`;
                document.cookie = `id=${data.user.id}`;
                document.cookie = `role=${data.user.role}`;
                dispatch(loginReq(data)); //sended to login req and added to the state    
            })
            .then(() => {
                window.location.href = redirectUrl;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

export {
    loginReq as
    default
}