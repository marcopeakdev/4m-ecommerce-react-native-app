#! /bin/bash

echo BACKEND_API_URL=$BACKEND_API_URL >> .env.development
echo BACKEND_API_TOKEN=$BACKEND_API_DEV_TOKEN >> .env.development
echo BACKEND_API_CONTENTFUL_BASE=$BACKEND_API_CONTENTFUL_BASE >> .env.development
echo BACKEND_API_GUESTY_BASE=$BACKEND_API_GUESTY_BASE >> .env.development
echo BACKEND_API_SPREEDLY_BASE=$BACKEND_API_SPREEDLY_BASE >> .env.development
echo BACKEND_API_TOAST_BASE=$BACKEND_API_TOAST_BASE >> .env.development
echo NPM_TOKEN=$NPM_TOKEN >> .env.development
