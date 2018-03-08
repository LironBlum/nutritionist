#!/usr/bin/env bash
usage()
 {
 echo "Usage: $0 build/up/down prod/all"
 exit 1
 }
if [[ ($# -eq 1 || ($# -eq 2 && $2 == all)) ]]
then
    CONF=$1
    SUFFIX="local"
    if [ ! -z "$2" ]
    then
        SUFFIX=$2
    fi
    case "${CONF}" in
        build*)  docker-compose -f docker-compose.$SUFFIX.yml build;;
        up*)     docker-compose -f docker-compose.$SUFFIX.yml up;;
        down*)   docker-compose -f docker-compose.$SUFFIX.yml down;;
        *)       echo " configuration not supported"
    esac
else
    usage
fi

# run.sh build prod
# run.sh build
# run.sh up  OR run.sh up prod

#for running all services together:
# run.sh build all
# run.sh up all