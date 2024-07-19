import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DynamicTable = () => {
  const gridData = [
    {
      "groupname": "agagra",
      "clustername": "cosclna",
      "week": "27",
      "usd_week": null,
      "startdate": "2024-07-01",
      "enddate": "2024-07-05",
      "netmtm_usd": 3689272.0,
      "net_aftersharing_usd": 317163.0,
      "usdrate": 83.5,
      "usdtoinrmtm": 26483617.0,
      "inrmtm": 0.0,
      "net_aftersharing_inr": 0.0,
      "NETPNL_(INR)": 26483617.0,
      "NETPNL_(USD)": null,
      "aed_ld": null,
      "inr_ld": null,
      "inr_balance": null,
      "aed_balance": null
    },
    {
      "groupname": "agagra",
      "clustername": "cosclna",
      "week": "27",
      "usd_week": 0.0,
      "startdate": "2024-07-01",
      "enddate": "2024-07-05",
      "netmtm_usd": -245116.0,
      "net_aftersharing_usd": -33138.0,
      "usdrate": 83.5,
      "usdtoinrmtm": -2767076.0,
      "inrmtm": 12656986.0,
      "net_aftersharing_inr": 0.0,
      "NETPNL_(INR)": -2767076.0,
      "NETPNL_(USD)": -33138.0,
      "aed_ld": 0,
      "inr_ld": 0,
      "inr_balance": 0,
      "aed_balance": null
    },
    {
      "groupname": "amitta",
      "clustername": "cosclfund",
      "week": "27",
      "usd_week": null,
      "startdate": "2024-07-01",
      "enddate": "2024-07-05",
      "netmtm_usd": -9900.0,
      "net_aftersharing_usd": -9900.0,
      "usdrate": 83.5,
      "usdtoinrmtm": -826666.0,
      "inrmtm": 0.0,
      "net_aftersharing_inr": 0.0,
      "NETPNL_(INR)": -826666.0,
      "NETPNL_(USD)": null,
      "aed_ld": null,
      "inr_ld": null,
      "inr_balance": null,
      "aed_balance": null
    }
  ];

  const extractHeadersAndData = (data) => {
    if (data.length === 0) return { headers: [], tableData: [] };

    const headers = Object.keys(data[0]);
    const tableData = data.map(item => Object.values(item));

    return { headers, tableData };
  };

  const { headers, tableData } = extractHeadersAndData(gridData);

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.pinnedCell]}>{item[0]}</Text>
      {item.slice(1).map((cell, cellIndex) => (
        <Text key={cellIndex} style={styles.cell}>{cell}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        {headers.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.headerCell]}>{header}</Text>
        ))}
      </View>

      {/* FlatList for the Table */}
      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        scrollToOverflowEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.table}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
      />
      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled
        style={styles.table}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', backgroundColor: '#537791' },
  headerCell: { fontWeight: 'bold', color: '#fff', textAlign: 'center', width: 100 },
  row: { flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1', alignItems: 'center' },
  cell: { textAlign: 'center', width: 100 }, // Adjust width as needed
  pinnedCell: {
    backgroundColor: '#F7F6E7',
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default DynamicTable;
