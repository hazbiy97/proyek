import React from 'react';
import PropTypes from 'prop-types';
import { Button, NavigatorIOS, Text, View } from 'react-native';

export default class NavigatorIOSApp extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigate('Profile', { name: 'Jane' })
                }
            />
        );
    }
}

class MyScene extends React.Component {
    static propTypes = {
        route: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
        navigator: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
    }

    _onForward() {
        let nextIndex = ++this.props.index;
        this.props.navigator.push({
            component: MyScene,
            title: 'Scene ' + nextIndex,
            passProps: { index: nextIndex },
        });
    }

    render() {
        return (
            <View>
                <Text>Current Scene: {this.props.title}</Text>
                <Button
                    onPress={this._onForward}
                    title="Tap me to load the next scene"
                />
            </View>
        );
    }
}
