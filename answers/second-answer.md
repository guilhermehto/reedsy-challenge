# Reedsy Second Challenge

## Persisting text-based documents
I believe that this problem can be approached in two different ways. One which is really obvious and wouldn't be effective in a storage size point of view, which is to just save every version of the file that the user saves and that's it. But as I said, it's not effective and it's not what's asked. 
The other solution, on the other hand, will provide a storage size efficiency but will have a greater cost because of processing. To begin with, I would take advantage of the bonus challenge and implement something that's pretty similar to it. Instead of storing every file save as a separated file, I would just save the first one. From then on, I would store the user edits and to get to any desired version it would be as simple as applying those edits to the file. This way, it would be possible to attend the four points:
- Save a version representing a document state: the document state would be implicitly saved with the edits
- Keep the versions for browsing and browse a previous version:  If the user wants to browse a version n of the file, all we have to do it apply all edits from version 1 to n and he'll be able to access the file
- Visualize changes: this is probably the biggest problem of my solution. I believe that to accomplish this, I would recreate the two files using the edits and then based on these edits, present the user with the changes of what was added and what was deleted, simply comparing the strings.
- 
To avoid the processing problem on the server, I would make the user create the file instead of creating it on the server and then returning it to the user. This would save a lot of processing on the server as this solution in really "cpu bound". Instead, of course, if the user was on a mobile device. 


