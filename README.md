Login in with Google Identity and React v18. 

Users can have roles with permissions: admin, moderator, user, banned.

**Set up google credentials for project.** 

In the Credentials section of the Google Developer Console, create an OAuth Client ID credential of type Web Application. 
https://console.developers.google.com/apis/credentials

**Update configs in /server/config/ directory.** 

For each config.example.js file, create a new file but without the '.example' part in the file name. Eg. db.config.example.js becomes db.config.js. 

Update the new files with your config values and do not commit to your repo. db.config.example.js should work without modification but for the file name change.

Set the values in auth.config.js to the values retrieved from Google credentials above.

**Update configs in /reactjs/src/configs.js**

1. Rename configs.example.js file to configs.js and update the properties in it.

2. The ports set for dev.apiUrl and dev.apiAuthUrl should match the ports set in docker-compose

3. Set the google credentials that were set for the project above.

**Start it up**

* Open your terminal, cd to the root directory and run:

`docker-compose up`
 
* When it's done building, in a new terminal window, run:

`docker exec -it db bash -c "bash /mysql/docker_init_mysql.sh"`

* You can now view loginreactjs in the browser.

`Local: http://localhost:3000`

**Access the db**

On the host from the command line:

docker exec -it db bash

mysql -uroot -proot

show databases;

use login;

show tables;

select * from users\G

**ERRORS**

If you do docker-compose up and get an error like:

```
Creating network "loginreactjs_default" with the default driver
Building db
Traceback (most recent call last):
File "/usr/bin/docker-compose", line 11, in <module>
blah
blah 
blah
```

On the command line run where YOUR_WHO_AM_I is who you are running your shell as:

`sudo chown -R YOUR_WHO_AM_I:YOUR_WHO_AM_I .`

