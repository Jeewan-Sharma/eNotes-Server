# Endpoints:

## Auth

### Permission : Open

1. Register = POST: '/auth/register',
   request: {
   username: string,
   email: string,
   password: string
   }

2. Login = POST: '/auth/login',
   request: {
   email: string,
   password: string
   }

## User

### Permission: Authenticated

3. Get All Users = GET: '/users',

4. Get User = GET: './user/:userId',

### Permission: Authenticated and Owned

5. Update User = PATCH: './user/:userId',
   request: {
   newUsername: string
   }

6. Delete User = DELETE: './user/:userId',

7. Change Password = PATCH: './user/change-password/:userId'
   request: {
   oldPassword: string,
   newPassword: string
   }

## Notes

### Permission: Authenticated and Owned

8. Create Note = POST: '/notes'
   request: {
   title: string,
   description: string,
   tags: [string]
   }

9. Get All Notes = GET: '/notes/:userId',

10. Update Note = PUT: './note/:noteId',
    request: {
    title: string,
    description: string,
    tags: [string]
    }

11. set Importance = PUT: './note/set-importance/:noteId'
    request: {
    isImportant: boolean
    }

12. Delete Note = DELETE: './note/:noteId',
