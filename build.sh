export ENV_CONFIG=docker-pre
export API_URL=/scan
export NETWORK_NAME=Phala
export NETWORK_ID=phala
export NETWORK_TYPE=pre
export NETWORK_TOKEN_SYMBOL=PHA
export NETWORK_TOKEN_DECIMALS=12
export NETWORK_COLOR_CODE=ffffff
export CHAIN_TYPE=para

npm install
npm run ng build -- --configuration=$ENV_CONFIG --output-path=dist