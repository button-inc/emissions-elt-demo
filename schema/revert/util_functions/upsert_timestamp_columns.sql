-- Revert eed:util_functions/upsert_timestamp_columns from pg

begin;

drop function eed_private.upsert_timestamp_columns(text,text,boolean,boolean,boolean,text,text);

commit;
