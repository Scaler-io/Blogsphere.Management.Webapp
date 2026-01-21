FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG BLOGSPHERE_API_GATEWAY_BASE_URL
ARG BLOGSPHERE_SEARCH_API_BASE_URL
ARG BLOGSPHERE_SEARCH_API_SUBSCRIPTION_KEY
ARG USE_MOCK_SERVICE

RUN node -e "const fs=require('fs');const p='src/environments/environment.prod.ts';let c=fs.readFileSync(p,'utf8');const esc=(v)=>v.replace(/'/g,\"\\\\'\");const repl=(key,val,isString=true)=>{if(!val)return;const v=isString?\"'\"+esc(val)+\"'\":val;const re=new RegExp(key+\":\\\\s*[^,\\\\n]+\" );c=c.replace(re,key+\": \"+v);};repl('blogShereApiGatewayBaseUrl',process.env.BLOGSPHERE_API_GATEWAY_BASE_URL);repl('blogsphereSearchApiBaseUrl',process.env.BLOGSPHERE_SEARCH_API_BASE_URL);repl('blogsphereSearchApiSubscriptionKey',process.env.BLOGSPHERE_SEARCH_API_SUBSCRIPTION_KEY);if(process.env.USE_MOCK_SERVICE){const val=String(process.env.USE_MOCK_SERVICE).toLowerCase();if(['true','false'].includes(val)){const re=new RegExp('useMockService:\\\\s*[^,\\\\n]+');c=c.replace(re,'useMockService: '+val);}}fs.writeFileSync(p,c);"

RUN npm run build -- --configuration=production

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/Blogsphere.Management.Webapp /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
