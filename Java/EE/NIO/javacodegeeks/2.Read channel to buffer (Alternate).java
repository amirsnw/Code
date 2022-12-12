...
buffer.flip(); 
if (buffer.hasRemaining()) { 
    byte [] src = new byte[buffer.limit()]; 
    buffer.get(src); 
    contents.append(new String(src)); 
} 

/*
line 2: Invert the position and limit of the Buffer to retrieve what has been read from the Channel.
line 3: Ensure there is something to read, ie: The difference between limit and position is > 0.
line 4: Create a byte array to be the size of the data in the Buffer.
line 5: Retrieve the contents of the Buffer into the byte array.
line 6: Create a String array from the contents of the byte array.
*/