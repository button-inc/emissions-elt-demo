FROM sqitch/sqitch

COPY schema/ schema/

WORKDIR ./schema

RUN sqitch deploy -d eed
