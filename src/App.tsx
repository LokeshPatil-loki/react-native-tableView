import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, DataTable} from 'react-native-paper';
import useHistoryStore, {TableData} from './zustand/historyStore';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatedDateString} from './utils/date';

type SortByColumn = {
  column: string;
  order: 'ASEC' | 'DESC';
};

const App = () => {
  const tableHead = useHistoryStore(state => state.tableHead);
  const tableData = useHistoryStore(state => state.tableData);
  const setTableData = useHistoryStore(state => state.setTableData);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const [sortByColumn, setSortByColumn] = useState<SortByColumn>({
    column: tableHead[0],
    order: 'ASEC',
  });

  useEffect(() => {
    setTableData([
      {
        cuenta: 'INGEVEC',
        pd: '002342',
        obra: '0016234',
        fetcha: '24/07/23',
      },
      {
        cuenta: 'CNGEVEC',
        pd: '00003',
        obra: '0016234',
        fetcha: '24/07/23',
      },
      {
        cuenta: 'EBCO',
        pd: '002345',
        obra: '0016235',
        fetcha: '23/07/23',
      },
    ]);
  }, []);

  const sortTable = (row1: TableData, row2: TableData) => {
    if (row1[sortByColumn.column] < row2[sortByColumn.column])
      return sortByColumn.order == 'ASEC' ? -1 : 1;
    if (row1[sortByColumn.column] < row2[sortByColumn.column])
      return sortByColumn.order == 'ASEC' ? 1 : -1;
    return 0;
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ): void => {
    if (selectedDate) {
      setDate(selectedDate);
      setFilterDate(formatedDateString(selectedDate));
    } else {
      setFilterDate(null);
    }
    setShowDatePicker(false);
  };

  return (
    <View>
      <Text>App</Text>
      <Text>
        Sort by {sortByColumn.column} | {sortByColumn.order}
      </Text>
      <Button
        onPress={() => {
          setShowDatePicker(true);
        }}>
        Fetcha
      </Button>
      {showDatePicker && (
        <RNDateTimePicker value={date} onChange={onDateChange} mode="date" />
      )}
      <Text>{date.toDateString()}</Text>
      <DataTable>
        <DataTable.Header style={{paddingHorizontal: 0}}>
          {tableHead.map(item => {
            return (
              <DataTable.Title
                style={[styles.flexCenter, styles.cell]}
                textStyle={styles.headingText}
                onPress={e => {
                  if (item === sortByColumn.column) {
                    setSortByColumn({
                      column: item,
                      order: sortByColumn.order === 'ASEC' ? 'DESC' : 'ASEC',
                    });
                  } else {
                    setSortByColumn({
                      column: item,
                      order: 'ASEC',
                    });
                  }
                }}>
                {item == sortByColumn.column && (sortByColumn.order == "ASEC" ? "+ " : "- ")}
                {item.toUpperCase()}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        {tableData
          .filter((value: TableData, index: number) => {
            if (filterDate) return value.fetcha == filterDate;
            return true;
          })
          .sort(sortTable)
          .map((data: TableData) => (
            <DataTable.Row onPress={e => console.log(data)} style={{paddingHorizontal: 0}}>
              {tableHead.map((column: string) => {
                const cell = (
                  <DataTable.Cell style={[styles.cell,styles.flexCenter]} textStyle={styles.cellText}>
                    {data[column]}
                  </DataTable.Cell>
                );
                return cell;
              })}
            </DataTable.Row>
          ))}
      </DataTable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  headingText: {
    fontWeight: 'bold',
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
  },
  cell: {
    // borderLeftWidth: 1, 
    // borderRightWidth: 1, 
    // borderColor: 'black',
    // alignItems: "center",
  },
  flexCenter:{
    flex: 1,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 12,
  }
});
