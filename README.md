# VidTutorial
Rating API

## Prequisites
- Required library
  1) NodeJS 14
  2) Yarn 1.22 or above
- MySQL
---

---
## Steps to run
- Install NodeJS [For Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
- Install Yarn [For Ubuntu](https://www.linuxcloudvps.com/blog/how-to-install-yarn-on-ubuntu-16-04/)
- run `yarn install` on the root directory of the program
- create a .env file on the root directory and replace the necessary parameters
  - PORT : Port number MySQL is running at
  - DB_HOST : Hostname for the domain MySQL is running at
  - DB_USER : Username for MySQL
  - DB_PWD : Password for MySQL
  - DB_NAME : MySQL database name to be used
- (Optional) run formInput.sql to insert form data into FormInput on the database being used
- run `yarn start` to run the program
---
## Steps to run unit test
- Install NodeJS [For Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) (Can be skipped if already done in Steps to run)
- Install Yarn [For Ubuntu](https://www.linuxcloudvps.com/blog/how-to-install-yarn-on-ubuntu-16-04/) (Can be skipped if already done in Steps to run)
- run `yarn test:class` on root directory of the program
