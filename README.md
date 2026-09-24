# Data-Visualisation-Website

This is the collated code for a 3rd year university web development project I did.
It involved using Javascript and Typescript APIs to grab tweet data from Twitter and weather data from the Met Office, uploading it to Amazon Web Services DynamoDB, and using Comprehend and Sagemaker respectively on the data for sentiments and predictions
These outputs were then inserted into another DynamoDB table.

The front end is written in HTML and CSS and hosted on S3
It then makes GET requests to an API on API Gateway to request data
Plotly is used to convert the data to graphs.

Required other repositories for other parts of the code
https://github.com/benmanuel12/Twitter-API-User
https://github.com/benmanuel12/DataVisualisationWebsite-DataFetcher

## Built with
- JavaScript, TypeScript, HTML, CSS, AWS

## Features
- Assembles data from AWS and Twitter into a cohesive dashboard
- Predicts upcoming weather for locations with machine learning
- Measures sentiment of tweets for locations

## Running it
- This is not designed to be run as-is, because the AWS code is no longer hosted, and the Twitter code is out of date since Twitter rebranded
- This is just a repository to show what I did write when it worked
