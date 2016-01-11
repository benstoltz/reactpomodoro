import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = null;

//noinspection JSUnresolvedVariable
let MessageSource = {
    getMessages: {
        remote(state){

            if(firebaseRef){
                firebaseRef.off();
            }

            firebaseRef = new Firebase('https://react-stack-ben.firebaseio.com/messages/' +
                state.selectedChannel.key);

            return new Promise((resolve, reject) => {
                firebaseRef.once("value", (dataSnapshot) => {
                    var messages = dataSnapshot.val();
                    resolve(messages);



                    firebaseRef.on("child_added", ((msg) => {
                        let msgVal = msg.val();
                        msgVal.key = msg.key();
                        Actions.messageReceived(msgVal);
                    }));

                })
            });
        },

        success: Actions.messagesReceived,
        error: Actions.messagesFailed,
        loading: Actions.messagesLoading
    },

    sendMessage: {
        remote(state){
            return new Promise((resolve, reject)=> {
                if(!firebaseRef){
                    return resolve();
                }

                firebaseRef.push({
                    "message": state.message,
                    "date": new Date().toUTCString(),
                    "author": state.user.github.displayName,
                    "userId": state.user.uid,
                    "profilePic": state.user.github.profileImageURL
                });
                resolve();
            });
        },
        success: Actions.messageSendSuccess,
        error: Actions.messageSendError
    }
};

export default MessageSource;
