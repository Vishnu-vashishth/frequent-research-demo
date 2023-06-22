import React, { useState, useEffect, useHistory } from 'react';
import { createBrowserHistory } from 'history';



import axios from 'axios';

const UserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [error, setError] = useState('');
    const history = createBrowserHistory();
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        axios
            .get('http://localhost:5005/api/countries')
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchStates = (country) => {
        axios
            .get(`http://localhost:5005/api/getstate/${country}`)
            .then((response) => {
                setStates(response.data || []);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchCities = (country, state) => {
        axios
            .get(`http://localhost:5005/api/getcities/${country}/${state}`)
            .then((response) => {
                setCities(response.data || []);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setCountry(e.target.value);
        fetchStates(e.target.value);
        setCities([]);
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setSelectedState(selectedState);
        setState(selectedState);
        console.log(selectedState, country, state);
        fetchCities(country, selectedState);
    };

    const validateForm = () => {
        let isValid = true;
        setError('');

        // Validation for first name and last name
        const nameRegex = /^[A-Za-z]+$/;

        if (!firstName.match(nameRegex)) {
            setError('First name should only contain alphabets');
            isValid = false;
        } else if (!lastName.match(nameRegex)) {
            setError('Last name should only contain alphabets');
            isValid = false;
        } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            setError('Please enter a valid email address');
            isValid = false;
        } else if (!country || !state || !city || !dob) {
            setError('All fields are required');
            isValid = false;
        } else {
            const today = new Date();
            const selectedDate = new Date(dob);
            let age = today.getFullYear() - selectedDate.getFullYear();
            const monthDiff = today.getMonth() - selectedDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                age--;
            }

            if (age < 14) {
                setError('Age must be greater than 14');
                isValid = false;
            }
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Handle form submission here
            const formData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                country: selectedCountry,
                state: selectedState,
                city: city,
                dob,
                gender:gender,
            };
            axios
                .post('http://localhost:5005/api/user-data', formData)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        history.push('/form-data', { data: response.data });
                        window.location.reload(true);
                    }
                    else {
                       alert(response.data.message);
                    }
                   

                })
                .catch((error) => {
                   alert("Email already exist");
                });

            console.log(formData);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full sm:w-96 bg-white p-6 shadow-xl rounded-lg">
                <h1 className="text-2xl font-bold mb-4">User Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block font-medium">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block font-medium">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>


                    <div>
                    <label htmlFor="gender" className="block font-medium">
                            Gender:
                        </label>
                        <div className = 'space-x-1'>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Female
                            </label>
                        </div>
                    </div>



                    <div>
                        <label htmlFor="email" className="block font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="country" className="block font-medium">
                            Country:
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={handleCountryChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option value={country.isoCode} key={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="state" className="block font-medium">
                            State:
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={state}
                            onChange={handleStateChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option value={state.isoCode} key={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="city" className="block font-medium">
                            City:
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option value={city.name} key={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dob" className="block font-medium">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;