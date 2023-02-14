import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class MethodsOrderedByOrderIndexTest {

    @Order(1)
    @Test
    void testB() {
        System.out.println("Running Test B");
    }

    @Order(2)
    @Test
    void testA() {
        System.out.println("Running Test A");
    }

    @Order(3)
    @Test
    void testD() {
        System.out.println("Running Test D");
    }

    @Order(4)
    @Test
    void testC() {
        System.out.println("Running Test C");
    }
}
