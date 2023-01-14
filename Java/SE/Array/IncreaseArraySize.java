import java.util.Arrays;

public class IncreaseArraySize {

    public static void main(String[] args) {

        String[] array = new String[]{"a", "b", "c", "d", "e", "f"};

        System.out.println("\nInitial Array Elements:");
        printArray(array);
        System.out.println("\nArray Length is: " + array.length);

        array = IncreaseArraySize.<String>add(array, "g");

        System.out.println("\nAfter Adding New Element:");
        printArray(array);
        System.out.println("\nArray Length is: " + array.length);
    }

    public static <T> T[] add(T[] inArr, T val) {
        int n = inArr.length;
        T[] res = Arrays.copyOf(inArr, n + 1);
        /*for (int i = 0; i < inArr.length; i++)
            res[i] = inArr[i];*/
        res[n] = val;
        return res;
    }

    private static <T> void printArray(T[] res) {
        System.out.print("[");
        for (int i = 0 ; i < res.length ; i++) {
            System.out.print(res[i]);
            System.out.print((i == res.length - 1) ? "" : ", ");
        }
        System.out.print("]");
    }
}
