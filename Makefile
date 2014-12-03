TESTS = test/*.js
REPORTER = list

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--reporter $(REPORTER) \
		$(TESTS)

test-cov:
	REPORTER=html-cov
    $(MAKE) test > coverage.html

.PHONY: test-cov test