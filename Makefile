CWD := $(shell pwd)
NODEUNIT = $(CWD)/node_modules/.bin/nodeunit
BROWSERIFY = $(CWD)/node_modules/.bin/browserify
BUILDDIR = $(CWD)/test/build

all: clean pretest test

pretest:
	mkdir -p $(BUILDDIR)
	cp node_modules/nodeunit/examples/browser/nodeunit.js $(BUILDDIR)/nodeunit.js
	cp node_modules/nodeunit/share/nodeunit.css $(BUILDDIR)/nodeunit.css
	$(BROWSERIFY) test/test.js > $(BUILDDIR)/test.js

test: pretest
	open test/test.html

clean:
	rm -rf $(BUILDDIR)
