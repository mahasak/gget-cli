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
const GithubContent = require('github-content');
const fileList = require('./filelist');

const GetGithubContentAsync = template => new Promise((resolve, reject) => {
    const options = {
        owner: 'github',
        repo: 'gitignore',
        branch: 'master'
    };

    const gc = new GithubContent(options);

    gc.file(template, (err, file) => err ? reject(err) : resolve(file))
});

const WriteFileAsync = (file, contents) => new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(file), contents, (err) => err ? reject(err) : resolve(true))
});

command
    .arguments('<template>')
    .option('-f, --file <file>', 'output filename default to .gitignore')
    .option('-o, --override', 'override output file')
    .option('-D, --debug', 'display error')
    .action(async (template) => {
        const indexes = Object.keys(fileList);
        const dest = !(command.file) ? '.gitignore' : command.file;

        log(figlet.textSync('GGignore!', {
            font: 'colossal',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }));

        log(
            "Download .gitignore with template from [github/gitignore]",
            chalk.green(template),
        );

        const checkStatus = ora('Checking template valididy').start()
        if (indexes.indexOf(template) > -1) {
            checkStatus.succeed('.gitignore template exists')
            checkStatus.stop();
        } else {
            checkStatus.fail('.gitignore template not exists')
            checkStatus.stop();
            process.exit();
        }

        const checkFileStatus = ora('Check target file status').start()
        if (command.override || !fs.existsSync(path.resolve(dest))) {
            checkFileStatus.succeed('.gitignore target already exists')
            checkFileStatus.stop();
        } else {
            checkFileStatus.fail('.gitignore target already exists')
            checkFileStatus.stop();
            process.exit();
        }

        const templatePath = fileList[template];
        const status = ora('Applying gitignore target from GitHub').start();

        try {

            const file = await GetGithubContentAsync(templatePath)
            await WriteFileAsync(dest, file.contents.toString());
            status.succeed(`.gitignore template applied to [${dest}] successfully`)
        } catch (err) {
            if (command.debug) {
                log(chalk.red(err));
            }
            status.succeed(`Failed to apply gitignore to [${dest}]`)
        } finally {
            status.stop()
            process.exit();
        }
    })
    .parse(process.argv);