import re

# .csv: areaName, ip1, ip2, ip3,...ipN

fileHandle = open( 'TraceRoute.txt' ) # read TraceRoute.txt
#print fileHandle.readline()
fileList = fileHandle.readlines()
f = file('routeIP.csv', 'w') # create a file
buf = ''
for fileLine in fileList:
	stripFileline = fileLine.strip() # delete the white space in the begining and ending 
	if len(stripFileline) >0: # delete blank line
		mNumber = re.match(r'\d+', stripFileline)
		if not mNumber:
			#print buf
			if len(buf) >0:
				f.write(buf+'\n')
			buf = stripFileline
		else:
			m = re.search(r'\d+\.\d+\.\d+\.\d+', stripFileline) #match ip address
			if m:
				buf = buf + ',' + m.group()
#print buf
f.write(buf+'\n')
print 'done'
#fileHandle.close()