// src/hooks/usePost.js
import { useState } from 'react';
import { base_url } from './apiConfig';

export const useAuth = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const post = async (postData) => {
    setLoading(true);
    setError(null);
    toggleLoader(true);

    try {
      const response = await fetch(base_url + url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toggleLoader(false);
    }
  };

  return { ApiData, loading, error, post };
};


export const usePost = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const post = async (postData) => {
    // Ensure 'status' is a boolean
    if (postData.hasOwnProperty('status')) {
      postData.status = postData.status === 'true' || postData.status === true;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(base_url + url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LogoutData}`,
        },
        body: JSON.stringify(postData), // Convert object to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };


  return { ApiData, loading, error, post };
};

export const usePostForm = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const post = async (postData) => {
    setLoading(true);
    setError(null);
    toggleLoader(true); // Show the loader

    try {
      const formData = new FormData();

      // Convert `postData` object into FormData format
      Object.keys(postData).forEach((key) => {
        formData.append(key, postData[key]);
      });

      const response = await fetch(base_url + url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LogoutData}`, // Authorization remains in headers
        },
        body: formData, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toggleLoader(false); // Hide the loader
    }
  };

  return { ApiData, loading, error, post };
};



export const usePatch = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const patch = async (postData) => {
    // Ensure 'status' is a boolean
    if (postData.hasOwnProperty('status')) {
      postData.status = postData.status === 'true' || postData.status === true;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(base_url + url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LogoutData}`,
        },
        body: JSON.stringify(postData), // Convert object to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };


  return { ApiData, loading, error, patch };
};


export const usePatchForm = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const patch = async (patchData) => {
    setLoading(true);
    setError(null);
    toggleLoader(true); // Show the loader

    try {
      const formData = new FormData();

      // Convert `patchData` object into FormData format
      Object.keys(patchData).forEach((key) => {
        formData.append(key, patchData[key]);
      });

      const response = await fetch(base_url + url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${LogoutData}`, // Authorization remains in headers
        },
        body: formData, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toggleLoader(false); // Hide the loader
    }
  };

  return { ApiData, loading, error, patch };
};






export const useGet = (url, initialData = null, idData = '') => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');
  const [isTriggered, setIsTriggered] = useState(false);

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const get = async () => {
    setLoading(true);
    setError(null);
    toggleLoader(true);

    try {
      const response = await fetch(base_url + url + idData, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LogoutData}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toggleLoader(false);
    }
  };

  return { ApiData, loading, error, get, setData };
};



export const useDelete = (url, initialData = null, idData = '') => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');
  const [isTriggered, setIsTriggered] = useState(false);

  const toggleLoader = (show) => {
    const loaderBox = document.querySelector('.loaderBox');
    if (loaderBox) {
      loaderBox.classList.toggle('d-none', !show);
    }
  };

  const del = async () => {
    setLoading(true);
    setError(null);
    toggleLoader(true); // Show the loader

    try {
      const response = await fetch(base_url + url + idData, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      toggleLoader(false); // Hide the loader
    }
  };

  return { ApiData, loading, error, del };
};
