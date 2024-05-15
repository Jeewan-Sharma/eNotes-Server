# Endpoints:

## Auth

### Permission : Open

1. Register = POST: '/auth/register',
   params: {username, email, password}

2. Login = POST: '/auth/login',
   params: {email, password}

## User

### Permission: Authenticated

3. Get All Users = GET: '/users',
4. Get User = GET: './user/:id',

### Permission: Authenticated and Owned

5. Update User = PATCH: './user/:id',
   params: {newUsername}

6. Delete User = DELETE: './user/:id',

7. Change Password = PATCH: './user/change-password/:id'
   params: {oldPassword, newPassword}

## Notes

### Permission: Authenticated and Owned
