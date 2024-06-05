## Getting Started

First, run the development server:

##### Website url

''' https://greendometech.netlify.app/

##### Greendome technology

''' this is a full stack project, making use of technologies as :

#### Back end technologies

''' Node js, express js, cors, mongo db etc...

#### Front-end technologies

''' Npm, React js, Next js, tailwindCSS, redux js, react-redux, socket io etc...

### FUNCTIONAITY

''' This project permits you to login as a student and register for courses, or login as a tutor and create your courses. As an Admin you have full priviledges on the site.

### React and next js FUNCTIONAITY

### ADMIN LOGIN

username: dkriz
password: secret

email: dkrizlive@gmail.com
password: secret

### STUDENT LOGIN

username: willis
password: secret

email: dayowillis@gmail.com
password: secret

#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
