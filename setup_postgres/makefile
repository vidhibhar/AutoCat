OUTPUTS = $(sort $(wildcard outputs/*.txt))
QUESTIONS = $(patsubst outputs/%.txt,%,$(OUTPUTS))
MAKEFILE_PATH = /Users/padmaprabagaran/hw1
ROOT = $(MAKEFILE_PATH)

all: path $(QUESTIONS)
	rm -rf tmp

%: queries/%.sql
	@echo "checking $@; correct if nothing below ----"
	@psql -A -t -d $(USER) -q -f $< 1> tmp/$@.txt
	@diff outputs/$@.txt tmp/$@.txt || echo "$@ is wrong"; exit 0
	@echo ""

path:
	@mkdir -p tmp

setup_postgres:
	@echo "creating tables"
	psql -d $(USER) -q -f setup_postgres/create_tables.sql
	@echo "importing data"
	psql -d $(USER) -q -c " ' DELIMITER ',' CSV;"
	psql -d $(USER) -q -c "COPY trip FROM '$(ROOT)/bike_sharing_data/trip.csv' DELIMITER ',' CSV;"
	psql -d $(USER) -q -c "COPY weather FROM '$(ROOT)/bike_sharing_data/weather.csv' DELIMITER ',' CSV;"
	@echo "test, count distinct business categories, the result should be 5"
	psql -d $(USER) -q -c "SELECT count(distinct(city)) FROM station;"


clean_postgres:
	psql -d $(USER) -q -f setup_postgres/drop_tables.sql


.PHONY: setup_postgres

