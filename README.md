# ngel-ui-angular

NGEL UI using angular

## Local Development (without Docker)

### Prerequisites

* Node 4.x.x
* npm 3.5.x or greater
* A Java Runtime Environment (for Cucumber/Selenium tests)

### Basic build commands

* `npm install` - Installs all dependencies. You'll want to run this after most checkouts.
* `npm start -- --env dev` - Starts the Webpack dev server on `http://localhost:8070/webpack-dev-server/index.html`. Recompiles as you save.
    If `localhost` doesn't load for you (due to existing configuration), try `127.0.0.1`
* `npm run -s build` - Runs the JS and CSS production build, which puts files into the `./public` directory.
    Environment configuration options from `app-config.json` may be chosen by specifying the environment name after the command like so:
    `npm run -s build -- --env dev`. Otherwise the environment will default to prod.
* `npm run -s test` - Runs the Jasmine unit tests headlessly through PhantomJS.
* `npm run -s tdd` - Runs unit tests automatically upon save. It's likely that you will want to run this at the same time as `start`.
* `npm run -s cucumber` - Runs Cucumber browser tests on the built files in `./public`. Defaults to using FireFox.
    * `npm run -s cucumber:ff` - An alias for the default cucumber command.
    * `npm run resetmockdb` - Resets mock database to original loaded state.
    * `npm run resetmockdb:hard` - Resets mock database from db file.

The `-s` flag in the commands above is to eliminate boilerplate error messaging in the event that a command fails.