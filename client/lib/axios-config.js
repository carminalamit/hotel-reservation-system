import axios from 'axios'

// app.defaults.headers.common['Authorization'] =
// 	localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : ''

export const app = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

app.defaults.headers.common['Authorization'] =
	localStorage.getItem('authenticateToken') ? 'Bearer ' + localStorage.getItem('authenticateToken') : ''