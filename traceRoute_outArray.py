f = file('traceRoute_outArray.txt', 'w') # create a file
fileHandle = open( 'geoIP.csv' )
fileList = fileHandle.readlines()
buf = ''
buf = buf + '['+'\n'
# sample input: 50.8333|4|85.88.33.1|EUSIP bvba|Belgium|,
# sample out put: [[50.8333,4,IP, ISP,"Belgium,city"] , [],[]],
# get ISP list
for fileLine in fileList:
	buf = buf + '['
	stripFileline = fileLine.strip()
	eachIP = stripFileline.split(',')
	for value in eachIP:
		#print value
		if (len(value)>0):
			if (cmp(value,'failed')!=0):
				eachISP =  value.split('|')
				# if has ISP data
				buf = buf + '['+eachISP[0]+','+eachISP[1]+', "'+eachISP[2]+'","'+eachISP[3]+'","'+eachISP[4]+','+eachISP[5]+'"'+'],'
				
	buf = buf + '],'+ '\n'
buf = buf + ']'
f.write(buf)
print 'done'