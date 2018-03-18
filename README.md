# nutritionist
#FE
cd FE
run:
docker run -u $(id -u) --rm -p 4200:4200 -v "$PWD":/app trion/ng-cli ng serve -host 0.0.0.0

test:
docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli-karma ng test --watch false

 e2e test:
 docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli-e2e ng e2e