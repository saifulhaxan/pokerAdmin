import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"
import { useAuth } from '../../Api';


const AdminLogin = () => {
    const navigate = useNavigate()
    const { ApiData: LoginResponse, loading: LoginLoadning, error: LoginError, post: submitData } = useAuth('auth/signin');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });




    useEffect(() => {
        document.title = 'Poker City | Login';
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData?.email != "" && formData?.email != "") {
            submitData(formData)
        }
    };

    useEffect(() => {
        if (LoginResponse) {
            localStorage.setItem('login', LoginResponse?.token);
            localStorage.setItem('username', LoginResponse?.user?.name);
            if(LoginResponse?.token) {
                navigate('/dashboard');
            }
        }
    }, [LoginResponse])

    useEffect(() => {
        if (LoginError) {
            console.log(LoginError)
        }
    }, [LoginError])


    return (
        <>
            <AuthLayout authTitle='Login' authPara='Login into your Account'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        label='Email Address'
                        required
                        id='userEmail'
                        type='email'
                        placeholder='Enter Your Email Address'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold'>Remember Me</label>
                        </div>
                        <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Login' type='submit' />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default AdminLogin
