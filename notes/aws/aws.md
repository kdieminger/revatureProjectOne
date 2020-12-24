# AWS
Amazon Web Services - Cloud Service Provider.
In other words, they provide computing power via the internet that we can take advantage of in preference to our own hardware.

## Scenario
Create an online vending machine. I provide goods via an internet interface. The application that this service runs on must therefore be executing on a computer? Whose computer is that?

### My Computer
I need a server farm.
Server Farm:
* Hardware (Servers)
* Internet Access (the good stuff, corporate accounts)
* Power
* Software licenses
* Real Estate
* Security
* Air Conditioning
* Cabling (Copper <- Extra security)
* IT Specialists
* Fire Suppression Systems and Alarms
* Backup Generator

Ok. I've bought the space and the personnel and the equipment and the servers and everything is running, and it is
#### March
Application is running fine, we have some customers but we aren't running at capacity and we think things are going well.
#### April
Huge decrease in customer throughput, we're running WAY under capacity, we should decommission some of these servers to save money. We don't want to store servers we aren't using, so we sell them.
#### May
No problems.
#### June
Small uptick in customers, we're experiencing a little lag, we order an additional server, it takes 3 weeks to arrive and get setup, but eventually the problem is dealt with.
#### July
No problems
#### August
Back-to-school. We get completely blind-sided by our first back-to-school season, so many more customers hit the site than usual that it just immediately goes down. Every time we get it back up it goes down again. We miss our biggest sales of the year because we didn't have the capacity. Our servers don't arrive until September... when our customer base goes back to normal.

### Cloud
We create a business account with AWS (Azure, Google, etc.) and have them handle literally everything but our actual application.
Oh we have additonally capacity requirements? We can have new servers up and running in MINUTES.
We can set up provisioning to occur automatically without our input, if we want.

## Cloud pros and cons
Pros:
* Don't have to worry about the hardware, personnel, real estate, power, internet hookups, cabline, AC, etc. etc. etc.
* Can scale server capacity to need very quickly
* Can take advantage of existing cloud services to very quickly develop new applications and features

Cons:
* All of your data is being stored by a third-party
* Your application only runs if the cloud provider is up.

## Overview
AWS was one of the first providers to really break into the market, as such they have kind of defined the market and it has only been in the last year/two years that Azure has finally become a true competitor.

### 4 years ago (not important)
* 18% Other (everyone in this category had <1% market share)
* 1% IBM
* 1% Alibaba
* 3% Google
* 3% Azure
* 74% AWS market share (This number should probably be more like 60%)

Azure has grown to something like 20% of the market and the market has evolved to the point where AWS has something more like 32% of the market, but the market is still growing, and AWS' loss in percentage points is actually a gain in customers.

### Overview Cont.
AWS has a multitude of services covering basically every business use case. They were first and fast and reliable in a vaccuum. And they're still innovating in the space and they're still reliable, but other services are starting to catch up.

Global outreach.
* Region - A discrete physical location at which a cloud provider has set up services.
* Availability Zone - A separate but connected data-center within a region.

## Account Setup
Create your AWS Account
* https://aws.amazon.com/
* Create an AWS Account
* Follow the instructions to create a _PERSONAL_ account.

## DynamoDB Setup

## IAM
Identity and Access Management
This is the service that governs access to your AWS Account and the services therein.
If you want to provide someone else access to your AWS Account (like an employee) you create an IAM user. If you want to access your account from an application (like uploading to S3 or to a database) you create a programmatic IAM user. etc. etc.
* User - An entity that has access to AWS services through IAM
* Group - An entity that grants users within it access to specific AWS services
* Policy - A description of AWS Service access priveleges.

## IAM Setup
Create an AWS Access Key
* Sign in
* IAM Services
* User
* Add User
* Give Username, Choose Programmatic access
* Create Group
* Add AmazonDynamoDBFullAccess policy to group
* On Review pane, choose create User
* ON THE NEXT SCREEN, you have the ONE TIME option to obtain the secret key for this user.
  * If you do not, you will not have access using that user.
  * I recommend making use of the `Download .csv` button.
* Create Access Key

## Configure the AWS CLI
* `aws configure`

## Install the AWS SDK
* `npm install --save aws-sdk`

## DynamoDB
Dynamo Database is a serverless, NoSQL database solution created by AWS. The AWS tells it they developed DynamoDB to better handle Prime Day traffic.

* *Serverless* - No server is running when the service is not in use. You do not pay for the costs of the service if you are not using it.
* *NoSQL* - Any database solution which does not implement the SQL relational database model. No SQL can actually refer to a relational database if that database doesn't implement SQL, and no two NoSQL database solutions are truly alike.

### Serverless Pros and Cons
Pro:
* Not paying while not using it. Ex. I have a database that I need to make queries infrequently or on an unpredictable schedule.
  
Con:
* If I need to constantly make requests to it, I'll be paying more for it than a non-servless solution
* Could potentially (though probably not as much as you're thinking in the specific case of DynamoDB) result in significant latency.

### NoSQL Pros and Cons
Pro:
* Don't have to worry as much about data schema.
* We store our data the way we are going to use the data (don't have to transform the data to make it workable).

Con:
* Data integrity may suffer.
* Querying the data can be very innefficient as we cannot really perform relational queries.

### Free Tier
* 25 GB of Storage
* 25 provisioned Write Capacity Units (WCU)
* 25 provisioned Read Capacity Units (RCU)
* Enough to handle up to 200M requests per month.

### Read and Write Capacity Units
We can provision capacity:
* We have a set amound of requests (read and write) that we can perform in a time period
* less expensive


We can have on-demand capacity
* We pay for what we use
* More expensive

Capacity Units ([Stolen directly from AWS](https://aws.amazon.com/dynamodb/pricing/provisioned/))
* Read capacity unit (RCU): Each API call to read data from your table is a read request. Read requests can be strongly consistent, eventually consistent, or transactional. _For items up to 4 KB in size, one RCU can perform one strongly consistent read request per second. Items larger than 4 KB require additional RCUs. For items up to 4 KB in size, one RCU can perform two eventually consistent read requests per second._ Transactional read requests require two RCUs to perform one read per second for items up to 4 KB. For example, a strongly consistent read of an 8 KB item would require two RCUs, an eventually consistent read of an 8 KB item would require one RCU, and a transactional read of an 8 KB item would require four RCUs. See Read Consistency for more details.
* Write capacity unit (WCU): Each API call to write data to your table is a write request. For items up to 1 KB in size, one WCU can perform one standard write request per second. Items larger than 1 KB require additional WCUs. Transactional write requests require two WCUs to perform one write per second for items up to 1 KB. For example, a standard write request of a 1 KB item would require one WCU, a standard write request of a 3 KB item would require three WCUs, and a transactional write request of a 3 KB item would require six WCUs

### Partition Key
A Key that identifies an item.
* Hash Key - Partitions based on a single attribute
* Range Key - Partitions based on two items. Allows us to group multiple items under a single partition key.

Our Partition key will be our Hash Key. This is the primary identifier for an item in our Database.

#### Local Secondary Index
An index where the first element is the Partition Key of the database and the second is another attribute that we can used to sort. Sometimes known as a sort key.

Can only be created during table creation. We can have only one.

#### Global Secondary Indexes
An index with any attributes. We can have as many of these as we want.

The more indexes we add, the worse performance will become.
Each Global Secondary Index requires additional provisioned capacity because it is using a different partition key.

### Scan vs Query
Scan looks at the entire table and then returns results. Query allows us to look at a partition (using the partition key) of the table and then return results.
If I don't have the table partitioned, then to retrieve a subset of the table (but not just one item) I have to perform a scan. We don't want to perform a scan unless we have to.