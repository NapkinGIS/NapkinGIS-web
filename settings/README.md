## Build image
```
docker build -t napkingis/settings .
```
Image for development:
```
docker build -f Dockerfile.dev -t napkingis/settings-dev .
```

## Development

### Build plugin's library

```
export GOPATH=`pwd`/go/libs:`pwd`/go
go build -buildmode=c-shared -o plugin/gisquick.so go/cmd/plugin/main.go
```

### Plugin development (Linux):
```
ln -s `pwd`/plugin ~/.local/share/QGIS/QGIS3/profiles/default/python/plugins/gisquick2
```
