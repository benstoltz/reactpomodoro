import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import MessageBox from './MessageBox.jsx';
import Login from './Login.jsx';
//import mui from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
//import personalTheme from './theme-palette';
import AppBar from 'material-ui/lib/app-bar';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';
import createFragment from 'react-addons-create-fragment';

const personalTheme = require('./theme-palette');

@connectToStores
class App extends React.Component {
    constructor() {
        super();
    }

    static getStores() {
        return [ChatStore];
    }

    static getPropsFromStores() {
        return ChatStore.getState();
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };


    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(personalTheme)
        };
    }

    render() {
        let view;

        if (this.props.user) {
            view = (
                <section>
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        maxWidth: '1200',
                        width: '100%',
                        margin: '30px auto 30px'
                    }}>
                        <ChannelList />
                        <MessageList />
                    </div>
                    <MessageBox />
                </section>
            );
        } else {
            view = <Login />;
        }

       return (
           <main>
               <AppBar title="Awesome awesome" />
               {view}
           </main>
       );
    }
}


export default App;