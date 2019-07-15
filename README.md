# GGET-CLI [![npm version](https://badge.fury.io/js/gget-cli.svg)](http://badge.fury.io/js/gget-cli) 

A set of CLI tools to reduce bolierplate task

## Install

```bash
npm install gget-cli -g
```

## Usage

```bash
Usage: gget [options] <url>

Options:
  -d, --dest <dest>  destination path for clone git
  -D, --debug        display error
  -h, --help         output usage information
```
Example: apply boilerplate from git url to current directory

```
gget https://github.com/<username>/<repository>
```

Example: apply boilerplate from git url to a directory module_1

```
gget https://github.com/<username>/<repository> -d module_1
```

Example: apply boilerplate from git url shorthand to current directory

```
gget <username>/<repository>
```

Example: apply boilerplate from git url shorthand to a directory module_1

```
gget <username>/<repository> -d module_1
```
