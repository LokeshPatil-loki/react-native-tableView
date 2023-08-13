import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Table,
  Row,
  Rows,
  RowsProps,
  TableWrapper,
  Cell,
  Col,
} from 'react-native-table-component';
import useHistoryStore, {TableData} from './zustand/historyStore';

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff', color: 'black'},
  textStyles: {
    margin: 8,
    color: "white",
  },
  tableBorderStyle: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
  },
});

const App = () => {
  /**
   * **************Translations Spanish => English*********
   * BUSCAR => Search
   * CUENTA => Accounts
   * PD => PD
   * OBRA => Construction
   * FECHA => Date
   *
   * **/
  const tableHead = useHistoryStore(state => state.tableHead);
  const tableData = useHistoryStore(state => state.tableData);
  const setTableData = useHistoryStore(state => state.setTableData);

  useEffect(() => {
    setTableData([
      {
        cuenta: 'INGEVEC',
        pd: '002342',
        obra: '0016234',
        fecha: '24/07/23',
      },
      {
        cuenta: 'INGEVEC',
        pd: '002343',
        obra: '0016234',
        fecha: '24/07/23',
      },
      {
        cuenta: 'EBCO',
        pd: '002345',
        obra: '0016235',
        fecha: '23/07/23',
      },
    ]);
  }, []);

  const tableDataToRows = (tableData: TableData[]) => {
    return tableData.map(item => [item.cuenta, item.pd, item.obra, item.fecha]);
  };

  const headingButton = (heading: string) => {
    return  (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => Alert.alert('Clicked')}>
        <View>
          <Text style={{color: '#c8e1ff', fontSize: 24}}>{heading}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View>
      <Text>Sortable Table</Text>

      
    </View>
  );
};

export default App;


