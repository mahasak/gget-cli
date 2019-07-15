#!/usr/bin/env node

const chalk = require('chalk');
const command = require('commander');
const figlet = require('figlet');
const fs = require('fs-extra');
const git = require('simple-git/promise');
const isUrl = require('is-url');
const log = console.log;
const ora = require('ora');
const path = require('path');
const touch = require('touch');
const urlExists = require('url-exists');


const directoryExists = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}

const resetGitFiles = (dest) => {
    fs.removeSync(path.resolve(dest, '.git'));
    fs.removeSync(path.resolve(dest, 'README.md'));
    touch(path.resolve(dest, 'README.md'));
}

const clone = async (url, destination) => {
    const status = ora('Bootstrapping from GitHub').start();

    try {
        await git().clone(url, destination);
        status.succeed('Successfully bootstraped !!');
    } catch (err) {
        status.fail('Bootstrapping failed !!!');
        throw err
    } finally {
        status.stop();
    }
}

const validateTemplateUrl = async (url) => {
    const status = ora('Validating template URL exists').start();
    const urlValid = await urlExistsPromise(url);
    
    if (!urlValid) {
        const TemplateURlInvalidError = `Provided url [${url}] is not valid.`
        status.fail(TemplateURlInvalidError)
        status.stop();
        throw new Error(TemplateURlInvalidError)
    }

    status.succeed('Template URL validated successfully')
    status.stop();
}

validateDestination = (dest) => {
    const status = ora('Validating destination').start();

    if (directoryExists(path.resolve(dest, '.git'))) {
        const giAlreadyExistError = `Cannot apply command is in this directory, try subfolder or remove .git.`
        status.fail(giAlreadyExistError);
        status.stop();
        throw new Error(giAlreadyExistError);
    }

    if (dest !== '.' && directoryExists(path.resolve(dest))) {
        const directoryExistsError = `Directory ${path.resolve(dest)} is already exists.`
        status.fail(directoryExistsError);
        status.stop();
        throw new Error(directoryExistsError);
    }

    status.succeed('Destination folder validated');
    status.stop();
}

const urlExistsPromise = url => new Promise((resolve, reject) =>
    urlExists(url, (err, exists) => err ? reject(err) : resolve(exists)));

command
    .arguments('<url>')
    .option('-d, --dest <dest>', 'destination path for clone git ')
    .option('-D, --debug', 'display error')
    .action(async (url) => {
        const gitUrl = isUrl(url) ? url : `https://github.com/${url}`;
        const dest = !(command.dest) ? '.' : command.dest;
        
        log(figlet.textSync('GGET!', {
            font: 'colossal',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }));

        log(
            "Bootstrap [%s] with template from [%s]",
            chalk.green(path.resolve(dest)),
            chalk.green(gitUrl),
        );

        try {
            await validateTemplateUrl(gitUrl);
            validateDestination(dest);
            await clone(gitUrl, dest);
            resetGitFiles(dest);
        } catch (err) {
            if (command.debug) {
                log(chalk.red(err));
            }
        } finally {
            process.exit();
        }
    })
    .parse(process.argv);
