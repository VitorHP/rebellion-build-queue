import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class System extends React.Component {
  onPress(selectedIndex) {
    this.props.onChange(this.props.id, selectedIndex);
  }

  render() {
    const { name, owner } = this.props;

    const buttons = [
      { element: () => <Icon name="resistance"/> },
      { element: () => <Icon name="square-o"/> },
      { element: () => <Icon name="empire"/> },
      { element: () => <Icon name="empire" color="red"/> },
    ];

    return (
      <View>
        <Text style={styles.name}>{name}</Text>
        <ButtonGroup buttons={buttons} selectedIndex={owner} onPress={this.onPress.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    paddingLeft: 10,
  }
});
