# Frontend Integration with Backend

This documentation provides detailed steps to integrate the back-end with the front-end of the LMS website.

## Setting Up Frontend to Communicate with Backend APIs

1. **Install Axios**: Axios is a popular HTTP client for making API requests. Install it using npm or yarn.
   ```bash
   npm install axios
   ```

2. **Create an Axios Instance**: Create a new file `api.js` in your frontend project and configure an Axios instance with the base URL of your backend API.
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://localhost:8000/api', // Update with your backend URL
   });

   export default api;
   ```

3. **Set Up API Endpoints**: Define functions to interact with the backend APIs for user authentication, blog post management, and admin functionalities.

   ```javascript
   // api.js

   // User Authentication
   export const registerUser = (userData) => api.post('/auth/register', userData);
   export const loginUser = (userData) => api.post('/auth/login', userData);
   export const getUserProfile = (token) => api.get('/auth/profile', {
     headers: { Authorization: `Bearer ${token}` },
   });

   // Blog Post Management
   export const getBlogPosts = () => api.get('/blog/post');
   export const createBlogPost = (postData, token) => api.post('/blog/post', postData, {
     headers: { Authorization: `Bearer ${token}` },
   });
   export const updateBlogPost = (postId, postData, token) => api.put(`/blog/post/${postId}`, postData, {
     headers: { Authorization: `Bearer ${token}` },
   });
   export const deleteBlogPost = (postId, token) => api.delete(`/blog/post/${postId}`, {
     headers: { Authorization: `Bearer ${token}` },
   });

   // Admin Functionalities
   export const getUsers = (token) => api.get('/admin/users', {
     headers: { Authorization: `Bearer ${token}` },
   });
   export const updateUser = (userId, userData, token) => api.put(`/admin/users/${userId}`, userData, {
     headers: { Authorization: `Bearer ${token}` },
   });
   export const deleteUser = (userId, token) => api.delete(`/admin/users/${userId}`, {
     headers: { Authorization: `Bearer ${token}` },
   });
   ```

## Examples of API Requests and Responses

### User Registration
**Request:**
```javascript
const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'password123',
};

registerUser(userData)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

### User Login
**Request:**
```javascript
const userData = {
  username: 'john_doe',
  password: 'password123',
};

loginUser(userData)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "access_token": "your_jwt_token"
}
```

### Get User Profile
**Request:**
```javascript
const token = 'your_jwt_token';

getUserProfile(token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "is_admin": false
}
```

### Create Blog Post
**Request:**
```javascript
const postData = {
  title: 'New Blog Post',
  content: 'This is the content of the new blog post.',
};

const token = 'your_jwt_token';

createBlogPost(postData, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "msg": "Post Created Successfully",
  "id": 1
}
```

### Update Blog Post
**Request:**
```javascript
const postId = 1;
const postData = {
  title: 'Updated Blog Post',
  content: 'This is the updated content of the blog post.',
};

const token = 'your_jwt_token';

updateBlogPost(postId, postData, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "msg": "Post Updated Successfully"
}
```

### Delete Blog Post
**Request:**
```javascript
const postId = 1;
const token = 'your_jwt_token';

deleteBlogPost(postId, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "msg": "Post Deleted Successfully"
}
```

### Get Users (Admin)
**Request:**
```javascript
const token = 'your_jwt_token';

getUsers(token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "is_admin": false
  },
  {
    "id": 2,
    "username": "jane_doe",
    "email": "jane@example.com",
    "is_admin": true
  }
]
```

### Update User (Admin)
**Request:**
```javascript
const userId = 1;
const userData = {
  is_admin: true,
};

const token = 'your_jwt_token';

updateUser(userId, userData, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "msg": "User updated successfully"
}
```

### Delete User (Admin)
**Request:**
```javascript
const userId = 1;
const token = 'your_jwt_token';

deleteUser(userId, token)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
```

**Response:**
```json
{
  "msg": "User deleted successfully"
}
```

## Handling Authentication Tokens in Frontend

1. **Store Token Securely**: Store the JWT token securely in local storage or cookies.
   ```javascript
   localStorage.setItem('token', response.data.access_token);
   ```

2. **Retrieve Token**: Retrieve the token when making authenticated requests.
   ```javascript
   const token = localStorage.getItem('token');
   ```

3. **Include Token in Requests**: Include the token in the Authorization header when making authenticated requests.
   ```javascript
   const token = localStorage.getItem('token');

   api.get('/auth/profile', {
     headers: { Authorization: `Bearer ${token}` },
   })
   .then(response => console.log(response.data))
   .catch(error => console.error(error.response.data));
   ```

By following these steps, you can successfully integrate the back-end with the front-end of your LMS website.
