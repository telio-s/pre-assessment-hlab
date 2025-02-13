# pre-assessment-hlab

## 1.1
Assuming the system currently has three microservices: Customer API, Master Data API,
and Transaction Data API, there is a new feature that requires data from all three
microservices to be displayed in near real-time. The current technology stack includes
REST APIs and an RDBMS database. How would you design a new API for this feature? [Answer](https://github.com/telio-s/pre-assessment-hlab/blob/main/1-1-test/test.txt)

## 1.2
Assuming the team has started planning a new project, the project manager asks you for a
performance test strategy plan for this release. How would you recommend proceeding to
the project manager? [Answer](https://github.com/telio-s/pre-assessment-hlab/blob/main/1-2-test/test.txt)

## 1.3
[Project](https://github.com/telio-s/pre-assessment-hlab/tree/main/1-3-nest-test)

### How to run

change .env.example to .env
```bash
docker compose up
# Using npm
npm install
npm run start
```
```bash
# create product
curl --location 'http://localhost:3000/product/create' \
--header 'Content-Type: application/json' \
--data '{
    "translations": [
        {
            "name": "boba tea",
            "description": "boba tea",
            "languageCode": "en"
        },
        {
            "name": "ชานม",
            "description": "ชานมมมม",
            "languageCode": "th"
        }
    ]
}'

# search product by name
curl --location 'http://localhost:3000/product/search?page=1&limit=10' \
--header 'Content-Type: application/json' \
--data '{"name":"tea"}'
```
Additional Requirements: [Answer](https://github.com/telio-s/pre-assessment-hlab/blob/main/1-3-nest-test/test.txt)

## 2.1
useCallback [Answer](https://github.com/telio-s/pre-assessment-hlab/blob/main/2-1-test/test.txt)


## 2.2
[Project](https://github.com/telio-s/pre-assessment-hlab/tree/main/2-2-react-test)
### How to run
```bash
# Using npm
npm install
npm run test
```
