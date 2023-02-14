import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Test Math operations in Calculator class")
public class CalculatorTest {

    Calculator calculator;

    /*@BeforeAll
    static void setup() {
        System.out.println("Executing @BeforeAll method.");
    }

    @AfterAll
    static void cleanup() {
        System.out.println("Executing @AfterAll method.");
    }

    @BeforeEach
    void beforeEachTestMethod() {
        calculator = new Calculator();
        System.out.println("Executing @BeforeEach method.");
    }

    @AfterEach
    void afterEachTestMethod() {
        System.out.println("Executing @AfterEach method.");
    }*/

    @DisplayName("Test 4/2 = 2")
    @Test
    void testIntegerDivision_WhenFourIsDividedByTwo_ShouldReturnTwo() {
        System.out.println("Running Test 4/2 = 2");
        // Arrange  // Given
        int dividend = 4;
        int divisor = 2;
        int expectedResult = 2;

        // Act      // When
        int actualResult = calculator.integerDivision(dividend, divisor);

        // Assert   // Then
        assertEquals(expectedResult, actualResult, "4/2 did not produce 2");
    }

    // @Disabled("TODO: Still need to work on it")
    @DisplayName("Division by zero")
    @Test
    void testIntegerDivision_WhenDividendIsDividedByZero_ShouldThrowArithmeticException() {
        System.out.println("Running Division by zero");
        // Arrange
        int dividend = 4;
        int divisor = 0;
        String expectedExceptionMessage = "/ by zero";

        // Act & Assert
        ArithmeticException actualException = assertThrows(ArithmeticException.class, () -> {
            // Act
            calculator.integerDivision(dividend, divisor);
        }, "Division by zero should have thrown an arithmetic exception");

        // Assert
        assertEquals(expectedExceptionMessage, actualException.getMessage(),
                "Unexpected exception message");
    }

    @DisplayName("Test integer subtraction [minuend, subtrahend, expectedResult]")
    @ParameterizedTest
    @MethodSource()
    void integerSubtraction(int minuend, int subtrahend, int expectedResult) {
        int actualResult = calculator.integerSubtraction(minuend, subtrahend);
        System.out.println("Running Test " + minuend + "-" + subtrahend + " = " + expectedResult);

        assertEquals(expectedResult, actualResult,
                () -> minuend + "-" + subtrahend + " did not produce " + expectedResult);
    }

    private static Stream<Arguments> integerSubtraction() {

        return Stream.of(
                Arguments.of(33, 1, 32),
                Arguments.of(54, 1, 53),
                Arguments.of(24, 1, 23)
        );
    }

    @Test
    void TestMath() {
        // Arrange

        // Act
        int currentResult = (int) Math.round(87777737.4549999);
        System.out.println("Result = " + currentResult);

        // Assert
    }
}
