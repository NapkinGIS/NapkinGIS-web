## Build image
```
docker build -t napkingis/web-map .
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Translations:

1. Scan and extract translations from source files:
```
npm run makemessages
```

2. Update translations (lang/[lang-code].po), e.g. open .po file in Poedit and select Catalog -> Update from POT file... -> select lang/messages.pot file

3. Compile translations into JSON
```
npm run translations
```
