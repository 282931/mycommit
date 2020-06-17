/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
} from 'react-native';

const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

const App: () => React$Node = () => {
  const [commitData, setCommitData] = useState([]);
  const uri =
    'https://raw.githubusercontent.com/jamesman11/us-map/master/github_commits_payload.json';
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const response = await fetch(uri);
    const result = await response.json();
    setCommitData(result);
  };
  function renderItem(data) {
    const {item} = data;
    return (
      <View style={styles.line}>
        {item.map((item, index) => (
          <View
            key={index}
            style={[
              styles.blocks,
              item.commits === 0
                ? {backgroundColor: colors[0]}
                : item.commits < 1
                ? {backgroundColor: colors[1]}
                : item.commits < 3
                ? {backgroundColor: colors[2]}
                : item.commits < 5
                ? {backgroundColor: colors[3]}
                : {backgroundColor: colors[4]},
            ]}
          />
        ))}
      </View>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          data={commitData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  blocks: {
    width: 30,
    height: 30,
    backgroundColor: colors[0],
    margin: 5,
  },
  line: {
    flexDirection: 'row',
  },
});

export default App;
