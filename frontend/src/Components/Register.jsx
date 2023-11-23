import axios from 'axios';
import React from 'react';

function Register() {
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            console.log({e})
            let data = {
                name: e.target[0]
            }
            // const response = await axios.post("/user/register", data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Register</h1>

            <form onSubmit={registerUser}>
                <input type="text" name="name" id="name" placeholder='name' />
                <input type="email" name="email" id="email" placeholder='email' />
                <input type="password" name="password" id="password" placeholder='password' />
                <select name="gender" id="gender">
                    <option value="MALE" selected>MALE</option>
                    <option value="FEMALE" selected>FEMALE</option>
                    <option value="OTHER" selected>OTHER</option>
                </select>
                <button type='submit'>Register</button>
            </form>
        </>
    )
}

export default Register