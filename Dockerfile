FROM perl:5.34

ENV HOME=/root
WORKDIR ${HOME}

COPY schema/ ${HOME}/schema/
COPY cpanfile ${HOME}/cpanfile

# RUN apt-get update && \
#   apt-get install -y postgresql-client && \
#   apt-get clean

# CPAN needs to install dependencies for all schemas, one directory up
RUN cpanm --notest --local-lib ./extlib --installdeps .

# CPAN can install scripts. They should be available from mod_perl too.
ENV PATH="$PATH:$HOME/extlib/bin"
# And we have to set Perl include path too because mod_perl's PerlSwitches
# does not apply to them.
ENV PERL5LIB=${HOME}/extlib/lib/perl5

WORKDIR ./schema

ARG PGUSER
ARG PGPASSWORD
ARG PGHOST

ENV ENV_PG_USER=$PGUSER
ENV ENV_PG_PASS=$PGPASSWORD
ENV ENV_PG_HOST=$PGHOST

CMD ["sh", "-c", "sqitch -t db:pg://${ENV_PG_USER}:${ENV_PG_PASS}@${ENV_PG_HOST}:5432/eed deploy"]
