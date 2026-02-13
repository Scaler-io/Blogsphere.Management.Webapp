#!/bin/sh
set -eu

TEMPLATE="/usr/share/nginx/html/assets/env.template.js"
OUTPUT="/usr/share/nginx/html/assets/env.js"

if [ -f "$TEMPLATE" ]; then
  : "${BLOGSPHERE_API_GATEWAY_BASE_URL:=}"
  : "${BLOGSPHERE_SEARCH_API_BASE_URL:=}"
  : "${BLOGSPHERE_SEARCH_API_SUBSCRIPTION_KEY:=}"
  : "${BLOGSPHERE_BFF_BASE_URL:=}"
  : "${BLOGSPHERE_BFF_SUBSCRIPTION_KEY:=}"
  : "${USE_MOCK_SERVICE:=false}"
  : "${DASHBOARD_REFRESH_INTERVAL_SECONDS:=}"

  envsubst < "$TEMPLATE" > "$OUTPUT"
fi
