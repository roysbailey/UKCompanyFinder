# UK Company Finder

Demonstrates the use of the gov.uk companies house beta API from a node js website.  To make it more performant, ajax calls are made to the API and client side binding with knockout.js is used to update the results.

You will need to get an API key, which must be set in an environment variable CH_BASIC_AUTH, in the following format:

	"Basic {YOUR API KEY FROM COMPANIES HOUSE}"
	Note. you dont include the '{}' characters above, but do include the quotes. 

Enjoy!
