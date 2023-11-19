# Nextjs-app Project

<img width="1433" alt="Screenshot 2023-11-19 at 10 44 45 PM" src="https://github.com/timothyytl/nextjs-app/assets/112664401/a44ad756-d0ad-42b4-9c0f-56d00b258910">
&nbsp;
<img width="1425" alt="Screenshot 2023-11-19 at 10 44 34 PM" src="https://github.com/timothyytl/nextjs-app/assets/112664401/672948eb-b626-49f7-96b6-549fbabe52df">


## Description
This project is a simple invoice and customer management application integrated with a basic user authentication and authorization system. This project was developed with the following technologies:

* Next.js Framework: The front-end development of this application is built using the Next.js framework.
* Back-end Framework: Vercel Postgres as the serverless SQL database and Prisma as the ORM.

Although there are other serverless SQL databases that I could have used other than Vercel Postgres (such as Neon), I went with Vercel Postgres because Vercel's platform is made by the creators of Next.js and have been learning Next.js through the documentation provided in their website. 

## Challenges encountered
During the development of this project, some challenges and questions arose:

Fortunately with a good understanding of React to start off, learning Next.js wasn't much of an issue although it still required some time to read up documentations and watch some tutorials about this framework to get a better grasp of this all-new concept. Integrating Prisma is something new to me and working on this project has shed light to this new discovery as a budding developer and I am certainly working diligently to learn up and put on more practice hours to get a deeper understanding of this server-side library that helps us read and write data to the database in a more efficient way.

I've integrated Edgestore.dev into my project in an attempt to faciliate an easier file uploading process but have not fully gotten it to work perfectly with the application nor syncing the files from the Edgestore database with Vercel and Prisma due to time constraints. Getting this right will require some additional R&D time. 

On the topic of time-constraint, I have yet to get the "Create Customer" section to work and will definitely be looking to getting it running as soon as I've submmitted this project for evaluation. Additionally, there are many other features that I am looking to include in this application such as integrating Clerk Authentication, using Shadcn/UI to beautify the components giving the project an even better user experience, and creating more administrative features such as e-invoicing system (which the Malaysian government is looking to implement next year), expense tracking, etc,. making it as close to a full-fledged invoicing platform and small CRM system.

## Data Model
The data modeling used with Prisma includes the following fields:
```
model customers {
  id        String @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name      String @db.VarChar(255)
  email     String @db.VarChar(255)
  image_url String @db.VarChar(255)
}

model invoices {
  id          String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  customer_id String   @db.Uuid
  amount      Int
  status      String   @db.VarChar(255)
  date        DateTime @db.Date
}

model revenue {
  month   String @unique @db.VarChar(4)
  revenue Int
}

model users {
  id       String @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name     String @db.VarChar(255)
  email    String @unique
  password String
}
```

## Prerequisites 
Ensure you have Node.js installed on your machine.
* Clone the Repository
```

git clone https://github.com/your-username/project-name.git
cd project-name
```
Install Dependencies
```
npm install
Configure the Database
The project uses a simple database. Make sure to set up the database connection by providing the necessary configuration in a .env file. You can use the .env.example file as a template.
```
Run the Application
```
npm run dev
```
Visit http://localhost:3000/login in your web browser.
To access the application, enter the following email and password:
* email: user@nextmail.com
* password: 123456

When you're done, just hit the sign out button on the bottom left of the dashboard.

## Important Design Decisions
Modularity: The project is designed with modularity in mind, making it easy to extend or modify the data model and functionality.

User Interface Design: While working on this project came along with some copy and pasting codes here and there, I've taken considerations to enhancing the user interface to create a more unique appearance, adjusting the Tailwind CSS codes to get the current look the application projects right now. I am looking to make it more interactive and including some additional animations to make it look more contemporary.

Hope you've enjoyed my simple project and contributions and feedback are always welcomed!

Feel free to reach out if you have any questions or face challenges while setting up or running the project. Thanks a bunch for your time! 😊
