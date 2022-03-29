#!/bin/bash

#this script backups the firestore database from the SOURCE PROJECT and
# restores it in the DEST project

SOURCE=$1
DEST=$2

gcloud config set project $SOURCE
OUTPUT=$(gcloud firestore export gs://$SOURCE.appspot.com/)

if [[ $OUTPUT =~ (UriPrefix: )(.*)( start) ]]; then 
  BASE_FILE=${BASH_REMATCH[2]}
else
  echo "BACKUP ERROR!"
fi

gsutil iam ch serviceAccount:$DEST@appspot.gserviceaccount.com:roles/storage.admin gs://$SOURCE.appspot.com/

gcloud config set project $DEST
gcloud firestore import $BASE_FILE --async

echo $BASE_FILE
