FROM node as base

COPY package* ./

RUN npm ci
RUN npm ci --only=dev

COPY . .

RUN npm run build

FROM scratch

COPY --from=base dist/bigquery-schema-to-postgres-ddl .

CMD ["bigquery-schema-to-postgres-ddl"]


