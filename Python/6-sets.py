print(set("my name is Eric and Eric is my name".split()))

#####################################

a = set(["Jake", "John", "Eric"])
b = set(["John", "Jill"])

print(a.intersection(b))
print(b.intersection(a))

#####################################
# which members attended only one of the events
a = set(["Jake", "John", "Eric"])
b = set(["John", "Jill"])

print(a.symmetric_difference(b))
print(b.symmetric_difference(a))

#####################################
# which members attended only one event and not the other
a = set(["Jake", "John", "Eric"])
b = set(["John", "Jill"])

print(a.difference(b))
print(b.difference(a))

#####################################
a = set(["Jake", "John", "Eric"])
b = set(["John", "Jill"])

print(a.union(b))