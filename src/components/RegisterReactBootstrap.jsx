/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { app } from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    const [passError, setPassError] = useState("");
    const [userSuccess, setUserSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState(null);

    const handleRegister = e => {
        e.preventDefault();
        setUserSuccess(false);

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        // validating password using regex
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPassError("Password must have at least 2 uppercase letters.");
            return;
        }
        if (!/.{8}/.test(password)) {
            setPassError("Password must have at least 8 characters.");
            return;
        }
        if (!/(?=.*[!@#$&*])(?=.*[0-9].*[0-9])/.test(password)) {
            setPassError("Password must have at least 2 digits and a special character.");
            return;
        }
        setPassError("")



        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUserSuccess(true);

                //setting display name
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => { })
                    .catch(error => { })

                //sending email verification
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert("A verification email was sent to your email address.");
                    })

                //resetting from after register success
                e.target.reset();
            })
            .catch(error => {
                setPassError(error.message);
            })

    }

    // get user email for forgot pass and set it to a state
    const handleUserPass = (e) => {
        setUserPass(e.target.value);
    }
    // show password event handler
    const handleShowPassword = (e) => {
        if (userPass) {
            alert(e.target.closest("#passwordBox").children[1].value);
        }
        e.preventDefault();
        e.stopPropagation();
    }

    // get user email for forgot pass and set it to a state
    const handleUserEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const handleForgotPassword = () => {
        if (!userEmail) {
            alert("Please enter your email!")
            return;
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => alert("A reset password email was sent!"))
            .catch(error => setPassError(error))
    }

    return (
        <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "100vh" }}>
            <div className='w-50 my-5 mx-auto form-control p-4 rounded-4 shadow border border-2 border-primary'>
                <h3 className='text-primary fw-bold mb-4 mt-2 text-center'>Register</h3>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Full Name" required />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" required onBlur={handleUserEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" id='passwordBox'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required onBlur={handleUserPass} />

                        <button className="btn btn-info d-block ms-auto px-3 py-0 mt-2 me-1" onClick={handleShowPassword}>Show Password</button>

                        <p className="text-danger fw-bold my-none">
                            {passError}
                        </p>

                        {userSuccess && <p className='text-success fw-bold ms-2'>Registration Successful</p>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className='px-5 py-2'>
                        Register
                    </Button>
                </Form>

                <div className="p-2 d-flex justify-content-between align-items-center">
                    <p><small className="text-muted fw-semibold my-3 d-block">
                        New to this website? Please <Link to="/login">Login</Link></small></p>
                    <p><small className="text-muted fw-semibold my-3 d-block">
                        Forgot Password? <Link onClick={handleForgotPassword}>Reset Password.</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterReactBootstrap;