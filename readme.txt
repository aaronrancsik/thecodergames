tsc --p tsconfig.server.json 
tsc --p tsconfig.client.json 
webpack --mode development


 "postinstall": "tsc --p tsconfig.server.json && tsc --p tsconfig.client.json && webpack --mode production"