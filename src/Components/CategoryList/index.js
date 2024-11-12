import React, { useState, useEffect } from 'react';

export const DietaryList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const LogoutData = localStorage.getItem('login');
                const response = await fetch('https://custom2.mystagingserver.site/food-stadium/public/api/dietary_listing', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LogoutData}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="loaderBox">Loading...</div>;
    }

    if (error) {
        return <div className="loaderBox">Error: {error.message}</div>;
    }

    return data;
};


export const CategoryList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const LogoutData = localStorage.getItem('login');
                const response = await fetch('https://custom2.mystagingserver.site/food-stadium/public/api/category_listing', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LogoutData}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="loaderBox">Loading...</div>;
    }

    if (error) {
        return <div className="loaderBox">Error: {error.message}</div>;
    }

    return data;
};


export const MenuList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const LogoutData = localStorage.getItem('login');
                const response = await fetch('https://custom2.mystagingserver.site/food-stadium/public/api/menu_listing', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LogoutData}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="loaderBox">Loading...</div>;
    }

    if (error) {
        return <div className="loaderBox">Error: {error.message}</div>;
    }

    return data;
};
