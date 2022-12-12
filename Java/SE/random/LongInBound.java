	@Test
public void givenUsingPlainJava_whenGeneratingRandomLongBounded_thenCorrect() {
    long leftLimit = 1L;
    long rightLimit = 10L;
    long generatedLong = leftLimit + (long) (Math.random() * (rightLimit - leftLimit));
}