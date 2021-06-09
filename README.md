# Data-Visualisation-Website-stuff

This is the collated code for a 3rd year university web development project I did.
It involved using Javascript and Typescript APIs to grab tweet data from Twitter and weather data from the Met Office, uploading it to Amazon Web Services DynamoDB, and using Comprehend and Sagemaker respectively on the data for sentiments and predictions
These outputs were then inserted into another DynamoDB table.

The front end is written in HTML and CSS and hosted on S3
It then makes GET requests to an API on API Gateway to request data
Plotly is used to convert the data to graphs.

Disclaimer: While this all worked when I had to submit the work, the cloud components are/were (depending on when you read this) running on a limited budget.
Here is the URL it is hosted at: https://cst3130-benmanuel-final-webpage.s3.amazonaws.com/index.html.
If the above url is broken, the cloud components have most likely run out of credit.
In this repository is every necessary program and microservice for it to run, although it is missing the API gateway, DynamoDB tables and SageMaker endpoints, models and configs
So, this repository is more of an archive of the code that I wrote for it, rather than a working prototype, which is why the name of the repository includes the word "stuff" as unlike my other repositories, this does not at minimum contain demonstratable working code
