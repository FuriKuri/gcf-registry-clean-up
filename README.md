# gcf-registry-clean-up

Simple cloud function to clean up old images

## Deploy

```
gcloud functions deploy image-cleanup --entry-point handler --runtime nodejs8 --trigger-topic image-cleanup
```