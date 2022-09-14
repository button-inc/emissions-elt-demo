FROM sqitch/sqitch

COPY schema/ schema/

WORKDIR ./schema

RUN echo "I was called"
CMD ["sqitch", "deploy", "-d", "eed"]
