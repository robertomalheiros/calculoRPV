import chrome from 'chrome-aws-lambda';



const chromeExecPaths = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};

const exePath = chromeExecPaths[process.platform];

export async function chromiumOptions(){
    let options = {}

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    } else {
        options = {
            args: [],
            executablePath: exePath,
            headless: true,
        };
    }

    return options
}

export default chromiumOptions


            


