This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Thoughts

Testing

4 functions were selected for testing as these functions are crucial to filtering the correct data from the csv file. The functions to parse the csv file does not have a test since the load function is specific to this scenario where the csv files are pulled locally within the repo. The tests for UI was also omitted as this is a rough mock up and is code that will be redesigned.

Data

I admit the z score is something that is not required in the assessement. I also admit that this is a bit overboard since it means I'm not strictly following the client's requirement. However, after noticing the small sample size of the data, I thought it would be interesting to add it in. If this was an assignment from a client, I would not add random features that the client did not ask for explictly.


Additional Items

I would've liked to stream the data from a specific source instead of storing the data locally, but I didn't want to make unnecessary fetch requests to your S3 bucket. Additionally, looking back, I would like to refactor parseCompanyData and parseScoreData functions to take in a file instead of grabbing one specific file from a local directory. Additional error handling would be nice with various status codes and error messages, but in the interest of time I chose to omit them for now. Lastly, I tried to break down the codebase as modular as possible for flexibility.

## Dependences

```bash
  "dependencies":
    "eslint": "8.40.0",
    "eslint-config-next": "13.4.2",
    "next": "13.4.2",
    "papaparse": "^5.4.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "simple-statistics": "^7.8.3"

  "devDependencies":
    "@babel/core": "^7.21.8",
    "@babel/preset-env": "^7.21.5",
    "@babel/preset-react": "^7.18.6",
    "babel-jest": "^29.5.0",
    "jest": "^29.5.0"
```
