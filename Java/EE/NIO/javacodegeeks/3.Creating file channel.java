...

final File file = new File(FileChannelReadExample.class.getClassLoader().getResource(path).getFile());
return fileOperation == FileOperation.READ ? new FileInputStream(file).getChannel() : 
                        new FileOutputStream(file).getChannel();
						
/*
line 3: Create a File Object
line 4: Depending on the type of File operation (read or write) we create the necessary Stream and get the Channel from the Stream.
*/