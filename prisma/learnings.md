how to add authenticatino in next js
    make the changes in schema , 
    migrate thoses changes "npx prisma migrate dev --name add-username-password"
    if no changes could be done , we will communicate throu prisma clien
    make a api/auth/signup/route.ts file 
        Prisma Client: Initializes a Prisma client to interact with the database.
            POST Handler: The POST function handles incoming requests to this API route.
            Body Parsing: Extracts username and password from the request body.
            Input Validation: Checks if username and password are provided. If not, it returns a 400 (Bad Request) error.
            Username Check: Uses prisma.user.findUnique to check if a user with the given username exists. If not, it returns a 401 (Unauthorized) error.
            Password Comparison: Uses bcrypt.compare to compare the provided password with the stored hashed password. If they don't match, it returns a 401 (Unauthorized) error.
            Success Response: Returns a 200 (OK) response with a success message.
            Error Handling: Catches any errors during the process and returns a 500 (Internal Server Error) response.