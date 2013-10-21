f = file('ISP.csv', 'w') # create a file

fileHandle = open( 'geoIP.csv' )
fileList = fileHandle.readlines()
buf = []
# sample: 50.8333|4|85.88.33.1|EUSIP bvba|Belgium|,
# get ISP list
for fileLine in fileList:
	stripFileline = fileLine.strip()
	eachIP = stripFileline.split(',')
	for value in eachIP:
		#print value
		if (len(value)>0):
			if (cmp(value,'failed')!=0):
				eachISP =  value.split('|')
				# if has ISP data
				if len(eachISP[3])>0:
						#print eachISP[3]
						buf.append(eachISP[3])
#print buf
ISP = dict()
for value in buf:
	if value in ISP:
		ISP[value] += 1
	else:
		ISP[value] = 1
from operator import itemgetter
m = sorted(ISP.items(), key=itemgetter(1))
for each in m:
	line = each[0] + ',' + str(each[1])
	f.write(line + '\n')