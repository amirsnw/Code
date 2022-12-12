public class Outer {
2: private String greeting = "Hi";
3:
4: protected class Inner {
5: public int repeat = 3;
6: public void go() {
7: for (int i = 0; i < repeat; i++)
8: System.out.println(greeting);
9: }
10: }
11:
12: public void callInner() {
13: Inner inner = new Inner();
14: inner.go();
15: }
16: public static void main(String[] args) {
17: Outer outer = new Outer();
18: outer.callInner();
19: } }