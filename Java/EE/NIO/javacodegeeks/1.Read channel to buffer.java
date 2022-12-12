...
final ByteBuffer buffer = createBuffer(); 
while (fileChannel.read(buffer) != -1) { 
    contents.append(new String(buffer.array())); 
    buffer.clear(); 
} 
... 
private ByteBuffer createBuffer() { 
    return ByteBuffer.allocate(x); 
}

/*
line 2: A ByteBuffer is created with a defined capacity. (BYTE_BUFFER_LENGTH)
line 3: Data is read from the specified FileChannel into the ByteBuffer.
line 4: The ByteBuffer’s current contents are added to the StringBuilder. This is done via convenience method array() as a result of the way the ByteBuffer was created in the example (via allocate()).
line 5: The ByteBuffer is cleared to prepare for reading more data from the channel, this will set the position cursor back to 0 and allow contents to be read from the FileChannel back into the ByteBuffer repeating the process until no more data is available.
*/