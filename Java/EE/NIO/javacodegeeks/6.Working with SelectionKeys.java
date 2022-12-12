final Iterator<SelectionKey> selectionKeyIterator = selectionKeys.iterator();
while (selectionKeyIterator.hasNext()) {
    final SelectionKey key = selectionKeyIterator.next();
 
    if (key.isAcceptable()) {
        acceptClientSocket(key, serverSocket);
    } else if (key.isReadable()) {
        readRequest(key);
    } else {
        System.out.println("Invalid selection key");
    }
 
    selectionKeyIterator.remove();
}

/*
The following code snippet demonstrates iterating through all the SelectionKey 
instances that indicate IO “ready” events from Channel instances managed by the 
single Selector. We are only interested in “Accept” and Readable” events. For 
every new connection accepted an “Accept” event is signaled and we can act on it. 
Likewise with a “read” ready event we can read incoming data. It is important to 
remove the  SelectionKey from the set after handling it, as the Selector does not 
do this and you will continue to process that stale event.
*/

/*
line 13: Remember to remove the SelectionKey from the selected set  as the 
	Selector does not do this for us, if we don’t do it, we will continue to 
	process stale events.
*/