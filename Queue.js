import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import R from 'ramda';

const systemsInState = (state) =>
  R.pipe(
    R.prop('systems'),
    R.values,
    R.filter((s) => s.state == state),
  )

const groupByQueue = R.reduce(
  (acc, system) => {

    const queue = R.reduce(
      (_acc, unit) => R.assoc(unit, _acc[unit] ? _acc[unit] + 1 : 1, _acc),
      acc[system.queue],
      system.units
    )

    return R.assoc(system.queue, queue, acc)
  },
  { 1: {}, 2: {}, 3: {}}
)

const subjulgatedUnits = R.map(
  (system) => R.assoc('units', R.slice(0, 1, system.units), system)
)

const subjulgatedSystems = R.pipe(
  systemsInState(2),
  subjulgatedUnits
)

const imperialSystems = (state) =>
  groupByQueue(
    R.concat(
      systemsInState(3)(state),
      subjulgatedSystems(state)
    )
  )

const rebelSystems = (state) =>
  groupByQueue(systemsInState(0)(state))

const describeBuild = (unitNames, queue) =>
  R.pipe(
    R.toPairs,
    R.map(([queueNumber, resources]) =>
      [
        queueNumber,
        R.pipe(
          R.toPairs,
          R.map(([resource, units]) => `${units} x ${R.join(" ou ", unitNames[resource])}`),
        )(resources)
      ]
    ),
    R.fromPairs
  )(queue)

export default class Queue extends React.Component {
  render () {
    const { galaxy } = this.props;

    const renderBuild = R.pipe(
      R.toPairs,
      R.map(([queueNumber, units]) => {
        return (
          <View style={styles.queueSpace} key={queueNumber}>
            <Text style={styles.unit}>{`Build in ${queueNumber}`}</Text>
            {R.addIndex(R.map)((unit, j) => (
              <Text style={styles.unit} key={j}>{unit}</Text>
            ), units)}
          </View>
        )
      }),
      R.reverse,
    )

    const imperialBuild =
      renderBuild(describeBuild(galaxy.units.empire, imperialSystems(galaxy)))

    const rebelBuild =
      renderBuild(describeBuild(galaxy.units.rebellion, rebelSystems(galaxy)))

    return (
      <View style={styles.queue}>
        <Text h2 style={styles.h2}>Imperial Build</Text>
        {imperialBuild}
        <Text h2 style={styles.h2}>Rebel Build</Text>
        {rebelBuild}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    margin: 30,
    textAlign: "center"
  },
  queue: {
    marginBottom: 40
  },
  queueSpace: {
    marginTop: 30
  },
  unit: {
    paddingLeft: 40,
    marginBottom: 20
  }
});
