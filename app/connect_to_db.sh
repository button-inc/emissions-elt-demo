export EED_DB_IP="34.125.92.26"
export EED_DB_PORT="5432"
export EED_DB_USER="eed_internal"
export EED_DB_PASS="secret"
export EED_DB_DEFAULTDB="eed"

psql postgresql://$EED_DB_USER:$EED_DB_PASS@$EED_DB_IP:$EED_DB_PORT/$EED_DB_DEFAULTDB
