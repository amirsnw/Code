import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

@Order(1)
public class UserServiceTest {


    @BeforeAll
    static void setup() {
        System.out.println("Test methods related to User");
    }

    @Test
    void testCreateProduct_whenFirstNameIsMissing_throwsUserServiceException() {
    }

}
