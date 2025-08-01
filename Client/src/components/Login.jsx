import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { setShowUserLogin } = useAppContext();
    const [isSignup, setIsSignup] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const context = useAppContext();

    if (!context || !context.setUser || !context.setShowUserLogin || !context.navigate) {
        console.error('AppContext is missing or incomplete');
        toast.error('Context error. Please try again.');
        return null;
    }

    const { setUser, navigate } = context;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            if (!firstName || !lastName || !phone || !email || !password) {
                toast.error('Please fill in all fields');
                return;
            }
            // Simulate account creation
            setUser({ email, firstName, lastName, phone });
            toast.success('Account created!');
        } else {
            if (!email || !password) {
                toast.error('Please enter both email and password');
                return;
            }
            // Simulate login
            setUser({ email });
            toast.success('Login successful!');
        }

        setShowUserLogin(false);
        navigate('/');
    };

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50">
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                noValidate
                className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
            >
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                    {isSignup ? 'Sign Up' : 'Login'}
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                    {isSignup ? 'Create a new account' : 'Please sign in to continue'}
                </p>

                {isSignup && (
                    <>
                        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                    </>
                )}

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                    </svg>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                    </svg>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                        required
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                    />
                </div>

                {!isSignup && (
                    <div className="mt-5 text-left text-primary">
                        <a className="text-sm" href="#">Forgot password?</a>
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
                >
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>

                <p className="text-gray-500 text-sm mt-3 mb-10">
                    {isSignup ? 'Already have an account? ' : 'Don’t have an account? '}
                    <button
                        type="button"
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-primary hover:underline"
                    >
                        {isSignup ? 'Login' : 'Sign up'}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
