copydistfiles:
	npx shx cp -r dist/* ./

clean:
	npx shx rm -rf ./css ./js ./favicon.ico ./index.html

all: clean copydistfiles
