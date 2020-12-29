## Build image
```
docker build -t napkingis/web-accounts .
```


## Development

### Compiles and hot-reloads for development
```
npm run serve
```
Project consists of multiple pages:
- ```/signup```
- ```/activate?uid=<UID>&token=<TOKEN>```
- ```/new-password?uid=<UID>&token=<TOKEN>```

### Lints and fixes files
```
npm run lint
```
