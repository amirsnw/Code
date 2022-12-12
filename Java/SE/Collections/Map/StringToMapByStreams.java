public Map<String, String> convertWithStream(String mapAsString) {
    Map<String, String> map = Arrays.stream(mapAsString.split(","))
      .map(entry -> entry.split("="))
      .collect(Collectors.toMap(entry -> entry[0], entry -> entry[1]));
    return map;
}