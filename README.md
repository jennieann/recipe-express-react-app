# recipe-express-react-app

# Get the project started
**Express server**  
Express server should run on 5000
- cd /workspace/recipe-express-react-app
- yarn start

**Start the React APP**  
In the package.json for the React App we have set the proxy to port 5000, wich is where the express server is running. Then start the react App with yarn start standing in the recipe directory.

- cd /workspace/recipe-express-react-app/client
- yarn start

# Set up the DB with some data
Stand in this folder /workspace/rest-api-recipe/node-postgres-promises.
From the command line run:
- sudo -u postgres psql -f recipes.sql

**Read about config**
# I used this tutorial to set up the project
- https://daveceddia.com/deploy-react-express-app-heroku/

**Heroku**
On Heroku right nog you need to write index.html to get to the React client

# Add stuff to the Heroku DB
`heroku pg:psql
psql (9.5.2, server 9.6.2)
SSL connection (cipher: DHE-RSA-AES256-SHA, bits: 256)
Type "help" for help.
=> create table test_table (id integer, name text);
CREATE TABLE
=> insert into test_table values (1, 'hello database');
INSERT 0 1
=> \q `  

\q  == quit the heroku pg:psql
