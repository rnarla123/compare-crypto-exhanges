# Compare Crypto Exchanges

## Python & Flask - Backend

Open flask_app

Create Virtual Environment:

For Mac/Linux:
```bash
$ python3 -m venv venv        # creates environment
$ source ./venv/bin/activate  # enters environment
```

Install Requirements:

```bash    
$ pip3 install -r requirements.txt
```

Run Project:

```bash    
$ flask run
```

## React - Frontend

Install required dependencies:

```bash
$ npm install
```

Run Project:

```bash
$ npm start
```

Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

The structure of the front end could have been better, since currently everything exists in two files. I also chose not to implement a database since we didn't require user management or any posting of data to the backend.

Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

I would not say it is over-designed, but I structured the backend in such a way that adding any additional currencies would be a simple task.

If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

We would need to implement some load balancing to handle the instances of the website, as well as increase the number of instances. Since currently there is no database, database scalability wouldn't be an issue. Also, we would need to adjust API calls since there are rate limits. One way is to cache certain requests from users, and if they are within a second of other API calls, we can return that.

What are some other enhancements you would have made, if you had more time to do this implementation?

If I had more time, the first thing I would have done is include testing in both the frontend and backend. Outside of this, I could have included more currencies outside of Bitcoin and Ethereum. Currently, the backend is set up in such a way so that it is easy to add additional currencies. I would have liked to have seperate pages for different exchanges so that users can find out more information about them. Then separately, I would have another page for the comparisons to occur. I also would have changed the UI of the website to make it more readable and user friendly, allowing for a better user experience. 


