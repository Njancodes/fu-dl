# FU-DL - File Uploader & Downloader

FU-DL is a lightweight and minimal web application I built during my internship at Datamonk. It is designed to provide a simple interface to manage files, and it excels at doing three core tasks:

- Upload Files

- List Uploaded Files

- Delete Files

The application uses AWS S3 as the storage backend to ensure scalability and durability of files, and uses SQLite to maintain metadata and references locally.

## Key Features

- Upload files directly from the browser via a clean, responsive interface.

- List all uploaded files in an organized, paginated table.

- Delete files instantly both from the S3 bucket and the local database.

- Minimal frontend using pure HTML, CSS, and JavaScript—no frontend frameworks like React or Vue.

- Dockerized for ease of deployment in any environment.

## How to set up

1. Clone the github repo.
2. Create the .env file with the necessary access keys and bucket information.
3. Create a test.db file which will be used to store the file ids used for uploading to S3 bucket.
4. Install all dependencies by running,
   `npm install`
5. Then run the index.js file in the project directory

### NOTE: you can use the dockerfile to create the app in two commands, obviously the .env and test.db file should still be made.

# Demo Video

https://www.youtube.com/watch?v=6RJZViNu9hE
