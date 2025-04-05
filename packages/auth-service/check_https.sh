#!/bin/bash

URL="$1"

if [[ -z "$URL" ]]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

# Extract hostname and port (if provided)
if [[ "$URL" =~ ^(https?://)?([^:/]+)(:([0-9]+))? ]]; then
  PROTOCOL="${BASH_REMATCH[1]}"
  HOSTNAME="${BASH_REMATCH[2]}"
  PORT="${BASH_REMATCH[4]}"

  if [[ -z "$PROTOCOL" ]]; then
    PROTOCOL="http://" # Default to http if not specified
  fi

  if [[ -z "$PORT" ]]; then
    if [[ "$PROTOCOL" == "https://" ]]; then
      PORT="443" # Default HTTPS port
    else
      PORT="80"  # Default HTTP port
    fi
  fi

  # Check if the connection is successful on the expected port
  if printf "HEAD / HTTP/1.0\r\nHost: $HOSTNAME\r\nConnection: close\r\n\r\n" | openssl s_client -connect "$HOSTNAME:$PORT" 2>/dev/null | grep "HTTP/"; then
    echo "URL: $URL is running on port $PORT"
    exit 0
  else
    echo "URL: $URL is NOT running on port $PORT or is not responding."
    exit 1
  fi

else
  echo "Invalid URL format."
  exit 1
fi
