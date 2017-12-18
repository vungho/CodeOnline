var child = require('child_process');
var spawn = require('child_process').spawn;
var fs = require('fs');
/* GET home page. */
var fileNameDefault = 'a.cpp';
var fileNameOutDefault = 'a.exe';
var fileNameOutDefaultNew = 'b.exe';
var defaultPath = './';
var defaultFilePath = defaultPath + fileNameDefault;
var defaultOutFilePath = defaultPath + fileNameOutDefault;
var defaultOutFilePathNew = defaultPath + fileNameOutDefaultNew;
var compilerCPlus = 'g++';


/**
 *
 * @param sourceCode : string include sources C++ code
 * @param inputs : list input type string
 * Module using compile in synctask so only run one compiling in a time
 * @return return compiler error if cant compile and return value when successful compiling.
 * @update Will update asynctask
 */
exports.codeCompiling = function (sourceCode, inputs, callback) {
    console.log("in Code Compiling Method");
    var sourceLocation = writeSourceToFile(sourceCode);
    var compiler = compileFileSource(sourceLocation);
    if (compiler.status === 0) {
        console.log("compiled successful");
        runCode(compiler, inputs, function (data) {
            callback(data);
        });
        return;
    }
    callback("compiler error");
};

function writeSourceToFile(sourceCode) {
    console.log("in writeSourceToFile Method");
    var fs = require('fs');
    fs.writeFileSync(defaultFilePath, sourceCode, 'utf-8');
    return defaultFilePath;
}

function compileFileSource(sourceLocation) {
    console.log("in compileFileSource Method");
    try {
        return child.spawnSync(compilerCPlus, [sourceLocation]);
    } catch (err) {
        console.log(err.message);
        return 'compiler error';
    }

}

function isSuccessCompiled(compiler) {
    compiler.stderr.on('data', function (data) {
        if (data !== '')
            return false;
    });
    return true;
}

function runCode(compiler, inputs, callback) {
    console.log("in runCode Method");
    var run = child.spawn(defaultOutFilePath);
    writeInput(run, inputs);
    return getResult(run, callback);
}

function writeInput(run, inputs) {
    console.log("in WriteInput Method");
    for (var i = 0; i < inputs.length; ++i)
        run.stdin.write(inputs[i]);
    run.stdin.end();

}

function getResult(run, callback) {
    console.log("in getResult Method");
    run.stderr.on('data', function (output) {
        if (output !== '') {
            console.log("Has error When get Result");
            callback(String(output));
        }
    });
    run.stdout.on('data', function (output) {
        console.log("get Result");
        if (fs.existsSync(defaultFilePath)) {
            fs.unlink(defaultFilePath, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
            });
        }
        if (fs.existsSync(defaultOutFilePath)) {
            fs.rename(defaultOutFilePath,defaultOutFilePathNew , (err) => {
                if (err) console.log(err);
                else console.log('successfully deleted');
            });
        }
        console.log(String(output));
        callback(String(output));
    });

}

