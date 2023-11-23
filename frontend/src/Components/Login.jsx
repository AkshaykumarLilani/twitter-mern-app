import axios from 'axios';
import React from 'react';

function Login() {
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            console.log({e})
            let data = {
                name: e.target[0]
            }
            // const response = await axios.post("/user/login", data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>login</h1>

            <form onSubmit={loginUser}>
                <input type="email" name="email" id="email" placeholder='email' />
                <input type="password" name="password" id="password" placeholder='password' />
                <button type='submit'>login</button>
            </form>
        </>
    )
}

export default Login;