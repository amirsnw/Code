try (final Selector selector = Selector.open(); 
     final ServerSocketChannel serverSocket = ServerSocketChannel.open();) {
    final InetSocketAddress hostAddress = 
          new InetSocketAddress(Constants.HOST, Constants.PORT);
    serverSocket.bind(hostAddress);
    serverSocket.configureBlocking(false);
    serverSocket.register(selector, serverSocket.validOps(), null);
 
    while (true) {
       final int numSelectedKeys = selector.select();
       if (numSelectedKeys > 0) {
           handleSelectionKeys(selector.selectedKeys(), serverSocket);
       }
    }
}

/*
With this proxy in place and the added benefit of setting those SelectableChannel 
types into non-blocking mode we are able to multiplex over said channels in a very 
efficient way, typically with very few threads, even as little as one.
*/

/*
line 1: We create a Selector using the systems default SelectorProvider.
line 2: We create a ServerSocketChannel which is a SelectableChannel.
line 6: We configure the ServerSocketChannel for non-blocking mode.
line 7: We then register the ServerSocketChannel with the Selector, we receive a 
	SelectionKey from the registration although I discard it, having no use for it. 
	The serverSocket.validOps() call will return an operation set that is supported 
	by the Channel, which in this case is only the “Accept Connection” event. 
	The returned SelectionKey contains an “interest set” which indicates the set 
	of IO events the Selector must monitor the Channel for.
line 10: We call select() on the Selector which is blocking until some IO occurs 
	on any of the SelectableChannel instances that are registered with it. It will 
	return the number of keys which are ready for IO activity.
*/