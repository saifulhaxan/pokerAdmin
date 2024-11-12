import { useState, useEffect } from 'react';

export const useApi = (endpoint) => {
  const [apiData, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const LogoutData = localStorage.getItem('login');
    const base_url = 'https://custom.mystagingserver.site/mtrecords/public/api/'
    async function fetchData() {
      document.querySelector('.loaderBox').classList.remove("d-none");
      try {
        const response = await fetch(base_url + endpoint, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}` // Include the token in the headers
          }
        });

        if (!response.ok) {
          document.querySelector('.loaderBox').classList.add("d-none");
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        document.querySelector('.loaderBox').classList.add("d-none");
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { apiData, loading, error };
}


export const usePost = (endpoint) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataForm, setDataForm] = useState({});

  // Create a function to update the dataForm state
  const updateDataForm = (newData) => {
    setDataForm(newData);
  };

  useEffect(() => {
    const LogoutData = localStorage.getItem('login');
    const base_url = 'https://custom.mystagingserver.site/mtrecords/public/api/'
    document.querySelector('.loaderBox').classList.remove("d-none");
    async function fetchData() {
      // Your loading indicator logic here

      try {
        const response = await fetch(base_url + endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}` // Include the token in the headers
          },
          body: JSON.stringify(dataForm)
        });

        if (!response.ok) {
          document.querySelector('.loaderBox').classList.add("d-none");
          // Handle error and loading indicator logic here
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Your loading indicator logic here

        // Update the API data state
        document.querySelector('.loaderBox').classList.add("d-none");
        setApiData(result);

        // Set loading state to false
        setLoading(false);
      } catch (err) {
        document.querySelector('.loaderBox').classList.add("d-none");
        // Handle errors and loading indicator logic here
        setError(err);
      }
    }

    // Call the fetchData function when the endpoint or dataForm changes
    fetchData();
  }, [endpoint, dataForm]);

  // Return the relevant data and functions
  return { apiData, loading, error, updateDataForm };
};


export const useEditpost = (endpoint) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [editData, setEditData] = useState('');

  const editParam = (editValue) => {
        setEditData(editValue)
  }
  useEffect(() => {
    const LogoutData = localStorage.getItem('login');
    const base_url = 'https://custom.mystagingserver.site/mtrecords/public/api/'
    document.querySelector('.loaderBox').classList.remove("d-none");
    async function fetchData() {
      // Your loading indicator logic here

      try {
        const response = await fetch(base_url + endpoint + editData, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}` // Include the token in the headers
          },
        });

        if (!response.ok) {
          document.querySelector('.loaderBox').classList.add("d-none");
          // Handle error and loading indicator logic here
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Your loading indicator logic here

        // Update the API data state
        document.querySelector('.loaderBox').classList.add("d-none");
        setApiData(result);

        // Set loading state to false
        setLoading(false);
      } catch (err) {
        document.querySelector('.loaderBox').classList.add("d-none");
        // Handle errors and loading indicator logic here
        setError(err);
      }
    }

    // Call the fetchData function when the endpoint or dataForm changes
    fetchData();
  }, [endpoint, editData]);

  // Return the relevant data and functions
  return { apiData, loading, error, editParam };
};


export const usePostUpdate = (endpoint) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [editData, setEditData] = useState('');

  const editParam = (editValue) => {
        setEditData(editValue)
  }
  // Create a function to update the dataForm state
  const updateDataForm = (newData) => {
    setDataForm(newData);
  };

  useEffect(() => {
    const LogoutData = localStorage.getItem('login');
    const base_url = 'https://custom.mystagingserver.site/mtrecords/public/api/'
    document.querySelector('.loaderBox').classList.remove("d-none");
    async function fetchData() {
      // Your loading indicator logic here

      try {
        const response = await fetch(base_url + endpoint + editData, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}` // Include the token in the headers
          },
          body: JSON.stringify(dataForm)
        });

        if (!response.ok) {
          document.querySelector('.loaderBox').classList.add("d-none");
          // Handle error and loading indicator logic here
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Your loading indicator logic here

        // Update the API data state
        document.querySelector('.loaderBox').classList.add("d-none");
        setApiData(result);

        // Set loading state to false
        setLoading(false);
      } catch (err) {
        document.querySelector('.loaderBox').classList.add("d-none");
        // Handle errors and loading indicator logic here
        setError(err);
      }
    }

    // Call the fetchData function when the endpoint or dataForm changes
    fetchData();
  }, [endpoint, dataForm]);

  // Return the relevant data and functions
  return { apiData, loading, error, updateDataForm, editParam };
};


