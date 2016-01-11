import Actions from '../actions';
import Firebase from 'firebase';


let firebaseRef = new Firebase('https://react-stack-ben.firebaseio.com/channels');

let ChannelSource = {
    getChannels: {
        remote(state) {
            return new Promise((resolve, reject) => {
                firebaseRef.once("value", (dataSnapshot) => {
                    let channels = dataSnapshot.val();
                    resolve(channels);
                })
            });
        },

        success: Actions.channelsReceived,
        error: Actions.channelsFailed
    }
};


export default ChannelSource;