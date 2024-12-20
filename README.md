**Community Food Network**<br>
The Community Food Network is an application designed to tackle food insecurity by connecting donors, beneficiaries, volunteers, and distribution centers in a streamlined ecosystem. This system leverages technology to facilitate the collection, distribution, and tracking of food resources to ensure equitable access to food for all.

**Features**
**Donor Management:**
Register and manage donors, track their donations, and ensure transparency.

**Beneficiary Management:**
Maintain beneficiary profiles and their food preferences for targeted distribution.

**Food Inventory Tracking:**
Manage food stocks efficiently, including perishable and non-perishable items.

**Distribution Centers:**
Manage distribution centers and track the delivery of food to beneficiaries.

**Volunteer Coordination:**
Register and manage volunteers to assist in food collection and distribution.

**Food Requests and Matching:**
Facilitate food requests from beneficiaries and match them with available resources.

**Community Gardens:**
Track and manage resources grown in community gardens for additional food support.

**Authentication and Security:**
Secure login and session management using express-session and Sequelize.

**Tech Stack**
**Backend** <br>
**Node.js:** Fast and scalable runtime environment.<br>
**Express.js:** Framework for building the API.<br>
**Sequelize:** ORM for interacting with the MySQL database.<br>
**MySQL:** Database for storing application data.<br>

**Frontend**<br>
**React.js:** Framework for creating dynamic user interfaces.<br>
**Bootstrap:** Responsive design framework for styling.<br>

**Additional Tools**<br>
**dotenv:** For managing environment variables securely.<br>
**bcrypt:** For password hashing and security.<br>
**CORS:** For handling cross-origin requests.<br>

**How It Works**<br>
**User Registration and Login:**
Donors and beneficiaries create accounts and log in securely.<br>
**Food Donations:**
Donors can log food donations, specifying quantity, type, and expiration dates.<br>
**Food Distribution:**
Food is distributed based on beneficiaries' needs and preferences.<br>
**Volunteer Coordination:**
Volunteers are matched with tasks like food collection and distribution.<br>
**Community Gardens:**
Track and utilize produce from community gardens for beneficiaries.<br>

*Installation and Setup*
*Clone the repository:*

```bash
Copy code
git clone https://github.com/banky99/food-distribution.git
cd community-food-network
Install dependencies:
```
For the server:
```bash
Copy code
cd server
npm install
```
For the client:
```bash
Copy code
cd client
npm install
Set up environment variables:
```
Create a .env file in the server folder with the following keys:
```bash
#Copy code
PORT=3001
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=community_food_network
SESSION_SECRET=your-secret-key
```
**Run the project:**

#Start the server:
```bash
Copy code
cd server
npm start
```
#Start the frontend:
```bash
Copy code
cd client
npm start
Open the app in your browser:
```

http://localhost:3000

**License**
This project is licensed under the MIT License.

**Acknowledgements**
Inspired by the Sustainable Development Goals (SDG), particularly Goal 2: Zero Hunger.
Thanks to the community and contributors for supporting this project.