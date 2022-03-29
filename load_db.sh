#!/bin/bash

# restores firestore database 
# call ./load_db.sh gs://web3dev-development.appspot.com/  # use your own bucket


GCLOUD_BUCKET=$1

unzip bkp.zip
gsutil mv bkp/ $GCLOUD_BUCKET
gcloud firestore import ${GCLOUD_BUCKET}/bkp/ --async
