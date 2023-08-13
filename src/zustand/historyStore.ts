import {create} from 'zustand';

export type TableData = {
  cuenta: string;
  pd: string;
  obra: string;
  fetcha: string;
  [key: string]: any;
};

export type HistoryTable = {
  tableHead: string[] | [];
  tableData: TableData[] | [];
  setTableData: (data: TableData[] | []) => void;
};

const useHistoryStore = create<HistoryTable>(set => {
  return {
    tableHead: ['cuenta', 'pd', 'obra', 'fetcha'],
    tableData: [],
    setTableData: (tableData: TableData[] | []) =>
      set(state => ({
        ...state,
        tableData,
      })),
  };
});

export default useHistoryStore;
