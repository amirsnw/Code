public String convertWithStream(Map<Integer, ?> map) {
    String mapAsString = map.keySet().stream()
      .map(key -> key + "=" + map.get(key))
      .collect(Collectors.joining(", ", "{", "}"));
    return mapAsString;
}