import xml.dom.minidom as minidom
xml="<books><book><title>Book 1</title><author>Author 1</author></book><book><title>Book 2</title><author>Author 2</author></book></books>"
formatted = minidom.parseString(xml).toprettyxml()
print(formatted)
