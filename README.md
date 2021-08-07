# VidTutorial
Rating API

## Prequisites
- Required library
  1) NodeJS 14
  2) Yarn 1.22 or above
- MySQL
---
## Assumptions
- FormInput field only accept `text`, `email` and `linear_scale` as accepted value for field `type`. Other values are not handled
- All routes are stored in one file as there is only a few routes. In ideal scenario, each "microservice" should have their own route file (For example, rating would be one file and form would be another file)
---
## Design Decisions
- Rating table is used to store the rating score only
- Review table has a one to many foreign key to FormInput to identify which remark belongs to which particular form field
- Review table has a one to one foreign key to Rating table to identify the remarks are tied to which rating score
- Sequelize is used as ORM to make the SQL operations easier (raw query string susceptible to injection)
- Unit test only covers all the models and non of the API as the API conforms to single responsibility use and therefore, assumption is that if the model operation works, the API should not fail
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
