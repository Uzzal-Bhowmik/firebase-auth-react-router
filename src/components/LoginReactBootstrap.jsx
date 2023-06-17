/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { app } from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginReactBootstrap = () => {
    const [userSuccess, setUserSuccess] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setUserSuccess(false);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUserSuccess(true);

                //resetting form after login success
                form.reset();
            })
            .catch(error => {
                setLoginError(error.message);
            })
    }



    return (
        <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "100vh" }}>
            <div className='w-50 form-control p-4 rounded-4 shadow border border-2 border-warning'>
                <h3 className='text-warning fw-bold mb-4 mt-2 text-center'>Login</h3>

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" id='passwordBox'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>

                    {/* login messages */}
                    <div className="m-0">
                        {userSuccess && <p className='fw-bold text-success'>Login Successful</p>}

                        {
                            loginError && <p className="text-danger fw-bold">{loginError}</p>
                        }
                    </div>

                    <Button variant="warning" type="submit" className='px-5 py-2'>
                        Login
                    </Button>
                </Form>

                <p><small className="text-muted fw-semibold my-3 d-block">
                    New to this website? Please <Link to="/register">Sign Up</Link></small></p>
            </div>
        </div>
    );
};

export default LoginReactBootstrap;