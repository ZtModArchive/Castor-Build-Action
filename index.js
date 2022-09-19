const core = require('@actions/core');
const github = require('@actions/github');
const downloadRelease = require('download-github-release');
const { exec } = require('child_process');

try
{
    // action arguments

    const castorLoc = core.getInput('CastorLoc');
    const z2f = core.getInput('Z2f');

    // configure castor.json

    const fs = require('fs');
    const fileName = './castor.json';
    const file = require(fileName);
    file.ExcludeFolders = file.ExcludeFolders.push(castorLoc);
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) throw err;
        console.log(JSON.stringify(file, null, 2));
        console.log('writing to ' + fileName);
    });

    // install castor

    const user = 'ZtModArchive';
    const repo = 'Castor';
    const leaveZipped = false;

    function filterRelease(release) {
        return release.prerelease === false;
    }
    function filterAsset(asset) {
        return asset.name.indexOf('castor') >= 0;
    }

    downloadRelease(user, repo, castorLoc, filterRelease, filterAsset, leaveZipped)
        .then(function () {
            console.log('All done!');
        })
        .catch(function (err) {
            throw err;
        });

    // build mod

    exec(`${castorLoc}/castor.exe build`, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
catch (error)
{
    core.setFailed(error.message);
}