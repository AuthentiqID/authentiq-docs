# Introduction

There is nothing to install when running Authentiq as a Service. Just register your client application at our hosted authentication service and head over to [Getting started](gettingstarted.md). This page describes how to install Authentiq Connect locally on your own system, in case you prefer that.

We're working hard on making Authentiq Connect installable and hence, this page gives a *preview* of a local installation but isn't supported just yet. 
{: class="alert alert-warning" role="alert" }


# Installation

## From pre-built packages

Pre-built packages are available at the moment for Debian 7.0, 8.0 and Ubuntu 15.04.

### Debian & Ubuntu

Add our repository to your APT sources, as root:

    :::bash
    apt-add-repository
    apt-get update
    apt-get install authentiq-connect

Edit the configuration file, see [below](#configuration) for details about the available configuration options:

    vim /etc/authentiq/authentiqd.conf

(Re)start the service:

    :::bash
    /etc/init.d/authentiqd restart

## From PyPI

You can also install `authentiqd` using PyPi. We recommend you use a virtual Python environment in this case to not clutter up your system with dependencies.

    :::bash
    pip install authentiq-connect

Edit the configuration file, see [below](#configuration) for details about the available configuration options:

    :::bash
    vim ./etc/authentiqd.conf

Be sure to check out available command line options for the daemon:

    :::bash
    ./bin/authentiq-provider --help

    usage: authentiq-provider [-h] [-v] [-D] [--log LOG] [--bind BIND] [--port PORT]
                           [--insecure] [--schema] [--gunicorn]
                           [--workers WORKERS] [--name NAME]
                           [--disable-websockets]
    
    Authentiq Connect Provider
    
    optional arguments:
      -h, --help            show this help message and exit
      -v, --verbose         increase verbosity (default: 0)
      -D, --debug           enable Flask debugging (default: False)
      --log LOG             write logs to (rotated) file (default: None)
      --bind BIND           ip to bind to (default: localhost)
      --port PORT           port to bind to (default: 5000)
      --insecure            disable JWT signature verification (default: False)
      --schema              create schema for database (default: False)
      --gunicorn            run under gunicorn (default: False)
      --workers WORKERS     start this many worker processes (gunicorn only)
                            (default: 1)
      --name NAME           process name to use (gunicorn only) (default: aq-
                            provider)
      --disable-websockets  run server without WebSocket support (default: False)

Then start the daemon:

    :::bash
    ./bin/authentiq-provider

## From source

Fork and/or clone the Github repository,

    git clone github...

and run:

    python setup.py
 
or install from source using PyPI:
 
    pip install -e github...


# Configuration

> Describe configuration file here. 

# Deployment

The daemon binds to localhost by default on purpose, you should really deploy `authentiqd` behind a caching webserver. We describe how to configure Nginx here, but the configuration can easily be translated to other servers.

## Nginx
 
 > Describe nginx configuration details with well-commented snippet..
 