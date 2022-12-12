public String convertWithIteration(Map<Integer, ?> map) {
    StringBuilder mapAsString = new StringBuilder("{");
    for (Integer key : map.keySet()) {
        mapAsString.append(key + "=" + map.get(key) + ", ");
    }
    mapAsString.delete(mapAsString.length()-2, mapAsString.length()).append("}");
    return mapAsString.toString();
}

@Test
public void givenMap_WhenUsingIteration_ThenResultingStringIsCorrect() {
    String mapAsString = MapToString.convertWithIteration(wordsByKey);
    Assert.assertEquals("{1=one, 2=two, 3=three, 4=four}", mapAsString);
}