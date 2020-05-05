Deployment of the project:

### Requirements ###
```
npm init -y
npm isntall -g mongodb
npm install -g ts-node
npm install -g typescript
npm install -g express
npm install --save-dev @types/node (or npm i @types/node)
```

### Heroku Deployment ###
First we create ```Procfile``` with the content inside to be: ```web: node main-server.js```

```
npx tsc (compiled typescript code to JS) 
git add . 
git commit -am "Your Message"
heroku login
heroku create
git push heroku master
```

### Code execution on localhost:8080 ###
```
ts-node --prefer-ts-exts main-server.ts (on Mac)
or 
npx ts-node --prefer-ts-exts main-server.ts (on Window)
```
or 
```
heroku local web
```
to check the our website

### Notes on the heroku deployment ###
In case heroku deployment encounters errors, I added these 2 lines into the ```package.json```:
```
"engine": {
    "node" : "Your_node_version"
}
"main: "node main-server.js"
```

### Conclusion ###

Our server works perfectly fine after those deployments steps taken above. 