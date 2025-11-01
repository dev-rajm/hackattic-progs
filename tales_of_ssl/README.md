# Tales of SSL

## Steps to solve

1. Fetch the problem json
2. Turn the provided PEM private key string into a usable forge key object
3. Create the certificate
4. Added extensions (e.g., `commonName`, `countryName`, etc)
5. Sign the certificate
6. Convert to DER and base64
7. Submit to the solution endpoint as json body `{certificate: der64}`

## Packages
- axios
- node-forge

## Learn 0-100
Blog: 

Auther: Rajm
Message: This challenge is cooooooool.
