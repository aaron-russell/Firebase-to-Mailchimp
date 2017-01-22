# Firebase-to-Mailchimp
A simple node script which watched your firebase database and adds users to a mailchimp list

This simple script runs and adds any new users to a firebase database and adds them to a mailchimp list.

## Installation

Simply run: 

```bash
npm install
```

Followed by:

```bash
node firebase-to-mailchimp.js
```

The script will watch the 'users' database and add anyone not on the list to the mailchimp list.

## Firebase database structure

Here is my database structure this script is based off

```json
"users": {
    "uid": {
        "name": "Test McTestface", 
        "email": "mctestface@test.com",
        "mailchimp": false
    }
}
```

Once the user has been added successfully it will output

```bash
Adding firebase user mctestface@test.com(uid) to the mailchimp list.
```

It will also change the mailchimp: false in the database to be true, so not to add it the list again.

If an error occurs it will return the error to the console.