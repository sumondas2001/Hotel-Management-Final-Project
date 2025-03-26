import axios from 'axios'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

export const axiosSecure = axios.create({
  baseURL: ' http://localhost:8000/',
  withCredentials: true,
})


const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    console.log('Axios Request Token:', token); // Debug log

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const status = error.response?.status;
    // console.log('st', status);
    if (status === 401 || status === 403) {
      logOut()
      navigate('/login')
    }
    return Promise.reject(error)
  })

  return axiosSecure
}

export default useAxiosSecure
