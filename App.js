import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import System from './System';
import Queue from './Queue';
import R from 'ramda';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      systems: {
        "mon-calamari": { name: "Mon Calamari", state: 1, queue: 3, units: ["t-b", "s-b"] },
        "felucia": { name: "Felucia", state: 1, queue: 1, units: ["t-y"] },
        "mygeeto": { name: "Mygeeto", state: 1, queue: 2, units: ["t-b", "s-y"] },
        "kessel": { name: "Kessel", state: 1, queue: 1, units: ["t-y"] },
        "saleucami": { name: "Saleucami", state: 1, queue: 1, units: ["c-y"] },
        "mandalore": { name: "Mandalore", state: 1, queue: 1, units: ["t-y", "t-b"] },
        "ord-mantell": { name: "Ord Mantell", state: 1, queue: 2, units: ["c-b", "c-y"] },
        "mal-hutta": { name: "Mal Hutta", state: 1, queue: 1, units: ["t-y", "t-b"] },
        "toydaria": { name: "Toydaria", state: 1, queue: 2, units: ["c-b"] },
        "kashyyk": { name: "Kashyyk", state: 1, queue: 1, units: ["t-y", "t-y"] },
        "alderaan": { name: "Alderaan", state: 1, queue: 1, units: ["t-y"] },
        "bothawui": { name: "Bothawui", state: 1, queue: 1, units: ["c-y"] },
        "malastare": { name: "Malastare", state: 1, queue: 1, units: ["t-y"] },
        "cato-neimoidia": { name: "Cato Neimoidia", state: 1, queue: 2, units: ["t-b", "c-y"] },
        "coruscant": { name: "Coruscant", state: 3, queue: 3, units: ["t-y"], hidden: true },
        "rodia": { name: "Rodia", state: 1, queue: 1, units: ["t-y"] },
        "naboo": { name: "Naboo", state: 1, queue: 1, units: ["t-y", "t-b"] },
        "sullust": { name: "Sullust", state: 1, queue: 2, units: ["t-y", "s-y"] },
        "corellia": { name: "Corellia", state: 1, queue: 3, units: ["c-b", "s-b"] },
        "geonosis": { name: "Geonosis", state: 1, queue: 2, units: ["t-b", "s-y"] },
        "ryloth": { name: "Ryloth", state: 1, queue: 1, units: ["t-y"] },
        "utapau": { name: "Utapau", state: 1, queue: 3, units: ["c-b", "s-b"] },
        "mustafar": { name: "Mustafar", state: 1, queue: 2, units: ["t-b", "c-b"] },
        "bespin": { name: "Bespin", state: 1, queue: 1, units: ["c-y"] },
        "rebel-base": { name: "", state: 0, queue: 1, units: ["t-b", "t-y"], hidden: true },
      },
      units: {
        rebellion: {
          "t-b": ["X Wing", "Y Wing", "Rebel Transport"],
          "c-b": ["Corellian Corvette"],
          "s-b": ["Mon Calamari Cruiser"],
          "t-y": ["Rebel Trooper"],
          "c-y": ["Airspeeder"],
          "s-y": ["Shield Generator", "Ion Cannon"],
        },
        empire: {
          "t-b": ["Tie Fighter"],
          "c-b": ["Assault Carrier"],
          "s-b": ["Star Destroyer"],
          "t-y": ["StormTrooper"],
          "c-y": ["AT-ST"],
          "s-y": ["AT-AT"],
        }
      }
    }
  }

  onChangeOwner(systemId, state) {
    this.setState(R.assocPath(['systems', systemId, 'state'], state, this.state))
  }

  render() {
    const { systems } = this.state;


    const _systems = [];

    for (id in systems) {
      if (!systems[id].hidden) {
        _systems.push(
          <System
            key={id}
            id={id}
            name={systems[id].name}
            owner={systems[id].state}
            onChange={this.onChangeOwner.bind(this)}/>
        );
      }
    }

    return (
      <ScrollView style={styles.container}>
        <Text h1 style={styles.h1}>Build</Text>
        {_systems}
        <Queue galaxy={this.state}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 30,
    padding: 30,
    textAlign: "center"
  },
  submit: {
    marginTop: 10,
    marginBottom: 10,
  }
});
