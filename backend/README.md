#project-tracker backend
#####Start the server
```
docker-compose up
```
#####Open a shell in project-tracker container
```
docker-compose exec project-tracker sh
```
#####Install modules
```
npm i && npm i bcrypt
```
#####Run database migrations
```
npm run db:migrate:all
```
#####Run database seeds
```
npm run db:seed
```
####Done!
#
####Other useful commands
#####Enter database
```
docker-compose exec project-tracker-db mysql -u root -ptoor
```
#####Rollback migrations
```
docker-compose exec project-tracker npm run db:rollback
```
#
