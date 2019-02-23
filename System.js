import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class System extends React.Component {
  onPress(selectedIndex) {
    this.props.onChangeOwner(this.props.id, selectedIndex);
  }

  onToggle(selectedIndex) {
    this.props.onToggleSabotaged(this.props.id);
  }

  render() {
    const { name, owner, sabotaged } = this.props;

    const buttons = [
      { element: () => <Icon name="resistance"/> },
      { element: () => <Icon name="square-o"/> },
      { element: () => <Icon name="empire"/> },
      { element: () => <Icon name="empire" color="red"/> },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{name}</Text>
          <CheckBox
            center
            title='Sabotaged'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={sabotaged}
            containerStyle={styles.checkboxContainer}
            checkedColor="red"
            onPress={this.onToggle.bind(this)}
          />
        </View>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={owner}
          onPress={this.onPress.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    paddingLeft: 10,
  },
  nameWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0
  }
});
