/*
  Search for Geolocation for an ip address.
 Use API: http://ip-api.com/
 choose "Newline Separated"
 
 Save in a .csv file with the format:
 'lat | long | ip | ISP | country | city |', ...
 */
String ipFile = "../routeIP.csv";
String newFile = "../geoIP.csv";
Table t;
Table newTable;
int i = 0;
int j = 1;

void setup() {
  frameRate(1); // send 1 request per second
  t = loadTable(ipFile);
  //  println(t.getRowCount());
  // create a new table to save the geo data
  newTable = new Table();
  // add columns and rows
  for (int k = 0; k < t.getColumnCount()-1; k++) {
    newTable.addColumn();
  }
  for (int k = 0; k < t.getRowCount(); k++) {
    newTable.addRow();
  }
}

void draw() {
  // send 1 request per second
  if (i < t.getRowCount()) {
    if (j < t.getColumnCount()) {
      if (t.getString(i, j) != null) {
        String ipAddress = t.getString(i, j);
        //        println(ipAddress);
        sandRequest(ipAddress, i, j);
      }
    }
  }
  j++;
  if (j >= t.getColumnCount()) {
    i++;
    j = 1;
  }
}

void sandRequest(String _ipAddress, int _i, int _j) {
  String[] data = loadStrings("http://ip-api.com/line/"+_ipAddress);
  String geo;
  //      println(data);
  if (data[0].equals("success")) {
    /*    Save in a .csv file with the format:
     'lat | long | ip | ISP | country | city |', ...*/
    for (int k=0; k<data.length; k++) {
      data[k] = data[k].replaceAll(", ", "-");
      data[k] = data[k].replaceAll("\"", "");
      data[k] = data[k].trim();
    }
    geo = data[7] +"|"+ data[8] +"|"+ data[13] +"|"+ data[10] +"|"+ data[1] +"|"+ data[5];
  }
  else {
    geo = "failed";
  }
  println(geo);
  newTable.setString(_i, _j-1, geo);
  saveTable(newTable, newFile);
}

