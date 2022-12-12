final SocketChannel client = serverSocket.accept();
client.configureBlocking(false);
client.register(key.selector(), SelectionKey.OP_READ);

/*
The following code snippet demonstrates the use of  registration 
of a SocketChannel with the same Selector that manages the ServerSocketChannel. 
Here, however, the interest set is only for IO “read” events.
*/