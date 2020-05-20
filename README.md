# elearn-tracker

> A frontend for E-learn tracker

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Deploy
- zaženemo `npm run build` in dobimo mapo dist v kateri je zbuidana build.js stran
- namestimo datoteke na server (npr. AWS S3 storage)
    - namestimo index.html in build.js datoteko
    - ustvarimo mapo dist in vanjo premaknemo build.js
    - usmerimo vse errorje v index.html, da lahko vue to shandla

## Vue CLI 3

### Create a project
- `vue create <PROJECT_NAME>`
- nastavimo opcije za projekt

 
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
