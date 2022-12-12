...
final Charset defaultCharset = Charset.defaultCharset();
final String text = "Lorem ipsum";
  
final ByteBuffer bufferA = ByteBuffer.wrap(text.getBytes()); 
final ByteBuffer bufferB = defaultCharset.encode(text);
  
final String a = new String(bufferA.array());
final CharBuffer charBufferB = defaultCharset.decode(bufferB);
  
System.out.println(a);
System.out.println(new String(charBufferB.array()));

/*
line 2 The default Charset is retrieved.
line 5 The sample text is wrapped in a ByteBuffer. The default Charset is used implicitly when encoding the characters into bytes.
line 6 The sample text is encoded explicitly using the default Charset encoder.
line 8 A String is created using the default Charset decoder implicitly .
line 9 A Character Buffer (ultimately a String) is created using the default Charset decoder explicitly.
*/