import {connect} from 'ngrok';

export default {
    init: async (authtoken, addr) => connect({authtoken, addr})
        .then((url) => url)
        .catch((error) => {
            console.error("Error opening ngrok tunnel: ", error);
            process.exitCode = 1;
        })
}